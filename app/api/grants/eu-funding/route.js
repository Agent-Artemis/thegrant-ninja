export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // EU Funding & Tenders Portal API
    const url = `https://api.tech.ec.europa.eu/search-api/prod/rest/search?apiKey=SEDIA&text=${encodeURIComponent(query)}&pageSize=25&pageNumber=1&sortBy=startDate&sortOrder=DESC`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('EU Funding API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const data = await response.json()
    
    const opportunities = (data.results || []).map(opp => ({
      id: opp.identifier,
      title: opp.title,
      agency: 'European Commission',
      programme: opp.frameworkProgramme,
      type: opp.type,
      status: opp.status,
      deadline: opp.deadlineDate,
      budget: opp.budget?.totalBudget,
      startDate: opp.startDate,
      description: opp.description || opp.objective || '',
      link: `https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/${opp.identifier}`,
      source: 'EU Funding & Tenders'
    }))

    return Response.json({
      opportunities,
      total: data.totalResults || opportunities.length
    })
  } catch (error) {
    console.error('EU Funding fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}
