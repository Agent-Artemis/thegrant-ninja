export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // USASpending.gov API - search federal spending
    const url = `https://api.usaspending.gov/api/v2/search/spending_by_award/`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filters: {
          keywords: [query],
          award_type_codes: ['02', '03', '04', '05'], // Grants
        },
        fields: ['Award ID', 'Recipient Name', 'Award Amount', 'Start Date', 'End Date', 'Awarding Agency', 'Award Description'],
        limit: 25,
        page: 1,
      })
    })

    if (!response.ok) {
      console.error('USASpending.gov API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const data = await response.json()
    
    const opportunities = (data.results || []).map(award => ({
      id: award.internal_id || award.generated_internal_id,
      title: award.Award Description || award.description || 'Federal Grant Award',
      agency: award['Awarding Agency'] || award.awarding_agency_name,
      recipient: award['Recipient Name'] || award.recipient_name,
      amount: award['Award Amount'] || award.total_obligation,
      startDate: award['Start Date'] || award.period_of_performance_start_date,
      endDate: award['End Date'] || award.period_of_performance_current_end_date,
      awardId: award['Award ID'] || award.piid,
      description: award.description || '',
      link: `https://www.usaspending.gov/award/${award.generated_internal_id || award.internal_id}`,
      source: 'USASpending.gov'
    }))

    return Response.json({
      opportunities,
      total: data.page_metadata?.total || opportunities.length
    })
  } catch (error) {
    console.error('USASpending.gov fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}
