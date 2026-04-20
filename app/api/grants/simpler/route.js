export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // Simpler.Grants.gov API (newer/beta Grants.gov interface)
    const apiKey = process.env.SIMPLER_GRANTS_API_KEY || '9NHb1CggplKrbHdKz6LObB2Hn'
    const url = `https://api.simpler.grants.gov/v1/opportunities/search`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({
        query: query,
        filters: {
          opportunity_status: ['forecasted', 'posted']
        },
        pagination: {
          page_size: 25,
          page_offset: 0
        },
        order_by: 'relevancy'
      })
    })

    if (!response.ok) {
      console.error('Simpler Grants API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const data = await response.json()
    
    const opportunities = (data.data || []).map(opp => ({
      id: opp.opportunity_id,
      title: opp.opportunity_title,
      agency: opp.agency_name,
      category: opp.opportunity_category,
      postedDate: opp.post_date,
      closeDate: opp.close_date,
      estimatedFunding: opp.estimated_total_program_funding,
      awardCeiling: opp.award_ceiling,
      awardFloor: opp.award_floor,
      description: opp.description || opp.summary || '',
      link: opp.opportunity_url || `https://grants.gov/search-results-detail/${opp.opportunity_id}`,
      source: 'Simpler.Grants.gov'
    }))

    return Response.json({
      opportunities,
      total: data.pagination?.total_records || opportunities.length
    })
  } catch (error) {
    console.error('Simpler Grants fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}
