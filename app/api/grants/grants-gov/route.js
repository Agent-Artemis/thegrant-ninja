export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // Grants.gov API endpoint (v2)
    const url = `https://www.grants.gov/grantsws/rest/opportunities/search/?keyword=${encodeURIComponent(query)}&oppStatuses=forecasted|posted&rows=25`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Grants.gov API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const data = await response.json()
    
    const opportunities = (data.oppHits || []).map(opp => ({
      id: opp.id,
      title: opp.oppTitle || opp.title,
      agency: opp.agencyName || opp.agency,
      category: opp.categoryCode || opp.category,
      postedDate: opp.postedDate,
      closeDate: opp.closeDate,
      fundingInstrument: opp.fundingInstrument,
      eligibility: opp.eligibility,
      description: opp.synopsis || opp.description || '',
      link: `https://www.grants.gov/search-results-detail/${opp.id}`,
      source: 'Grants.gov'
    }))

    return Response.json({
      opportunities,
      total: data.totalHits || opportunities.length
    })
  } catch (error) {
    console.error('Grants.gov fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}
