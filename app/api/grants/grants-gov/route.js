export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // Grants.gov API v2 (new endpoint)
    const url = `https://api.grants.gov/v1/api/search2`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: query,
        rows: 100
      })
    })

    if (!response.ok) {
      console.error('Grants.gov API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const result = await response.json()
    const data = result.data || {}
    
    // Filter out expired grants
    const now = new Date()
    const validOpps = (data.oppHits || []).filter(opp => {
      if (!opp.closeDate) return true
      const closeDate = new Date(opp.closeDate)
      return closeDate >= now
    })
    
    const opportunities = validOpps.map(opp => ({
      id: opp.id || opp.number,
      title: opp.title || opp.oppTitle,
      agency: opp.agencyName || opp.agency,
      category: opp.categoryCode || opp.category,
      postedDate: opp.postedDate,
      closeDate: opp.closeDate,
      fundingInstrument: opp.fundingInstrument,
      eligibility: opp.eligibility,
      description: opp.synopsis || opp.description || '',
      link: `https://www.grants.gov/search-results-detail/${opp.id || opp.number}`,
      source: 'Grants.gov'
    }))

    return Response.json({
      opportunities,
      total: data.hitCount || opportunities.length
    })
  } catch (error) {
    console.error('Grants.gov fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}
