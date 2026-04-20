export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ 
      opportunities: [], 
      total: 0,
      bySource: {}
    })
  }

  try {
    // Fetch from all sources in parallel
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'

    const [grantsGov, samGov, sbir, usaSpending] = await Promise.allSettled([
      fetch(`${baseUrl}/api/grants/grants-gov?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/sam-gov?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/sbir?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/usaspending?query=${encodeURIComponent(query)}`).then(r => r.json()),
    ])

    const results = {
      grantsGov: grantsGov.status === 'fulfilled' ? grantsGov.value : { opportunities: [], total: 0 },
      samGov: samGov.status === 'fulfilled' ? samGov.value : { opportunities: [], total: 0 },
      sbir: sbir.status === 'fulfilled' ? sbir.value : { opportunities: [], total: 0 },
      usaSpending: usaSpending.status === 'fulfilled' ? usaSpending.value : { opportunities: [], total: 0 },
    }

    // Combine all opportunities
    const allOpportunities = [
      ...results.grantsGov.opportunities,
      ...results.samGov.opportunities,
      ...results.sbir.opportunities,
      ...results.usaSpending.opportunities,
    ]

    return Response.json({
      opportunities: allOpportunities,
      total: allOpportunities.length,
      bySource: {
        'Grants.gov': results.grantsGov.total,
        'SAM.gov': results.samGov.total,
        'SBIR/STTR': results.sbir.total,
        'USASpending.gov': results.usaSpending.total,
      }
    })
  } catch (error) {
    console.error('Combined API fetch error:', error)
    return Response.json({ 
      opportunities: [], 
      total: 0,
      bySource: {}
    })
  }
}
