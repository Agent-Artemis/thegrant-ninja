export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // SBIR.gov API - search active solicitations
    const url = `https://www.sbir.gov/api/solicitations.json?keyword=${encodeURIComponent(query)}`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('SBIR.gov API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const data = await response.json()
    
    const opportunities = (data || []).map(opp => ({
      id: opp.solicitation_id || opp.id,
      title: opp.solicitation_title || opp.title,
      agency: opp.agency,
      program: opp.program,
      openDate: opp.open_date,
      closeDate: opp.close_date,
      phase: opp.solicitation_phase,
      description: opp.solicitation_topics || opp.description || '',
      link: opp.solicitation_url || `https://www.sbir.gov/sbirsearch/detail/${opp.solicitation_id}`,
      source: 'SBIR.gov'
    }))

    return Response.json({
      opportunities,
      total: opportunities.length
    })
  } catch (error) {
    console.error('SBIR.gov fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}
