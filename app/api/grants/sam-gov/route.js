export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // SAM.gov Opportunities API
    const apiKey = process.env.SAM_GOV_API_KEY || 'DEMO_KEY'
    const url = `https://api.sam.gov/opportunities/v2/search?api_key=${apiKey}&postedFrom=${getDateDaysAgo(365)}&postedTo=${getTodayDate()}&ptype=o,k&limit=25&keyword=${encodeURIComponent(query)}`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('SAM.gov API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const data = await response.json()
    
    const opportunities = (data.opportunitiesData || []).map(opp => ({
      id: opp.noticeId,
      title: opp.title,
      agency: opp.department || opp.officeAddress?.agency,
      type: opp.type,
      postedDate: opp.postedDate,
      responseDeadline: opp.responseDeadLine,
      naicsCode: opp.naicsCode,
      description: opp.description || '',
      link: `https://sam.gov/opp/${opp.noticeId}/view`,
      source: 'SAM.gov'
    }))

    return Response.json({
      opportunities,
      total: data.totalRecords || opportunities.length
    })
  } catch (error) {
    console.error('SAM.gov fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0].replace(/-/g, '/')
}

function getDateDaysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().split('T')[0].replace(/-/g, '/')
}
