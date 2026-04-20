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

    const [
      grantsGov, 
      samGov, 
      sbir, 
      usaSpending, 
      nihReporter, 
      nsf, 
      worldBank, 
      euFunding, 
      federalRegister,
      simplerGrants
    ] = await Promise.allSettled([
      fetch(`${baseUrl}/api/grants/grants-gov?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/sam-gov?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/sbir?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/usaspending?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/nih-reporter?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/nsf?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/world-bank?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/eu-funding?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/federal-register?query=${encodeURIComponent(query)}`).then(r => r.json()),
      fetch(`${baseUrl}/api/grants/simpler?query=${encodeURIComponent(query)}`).then(r => r.json()),
    ])

    const results = {
      grantsGov: grantsGov.status === 'fulfilled' ? grantsGov.value : { opportunities: [], total: 0 },
      samGov: samGov.status === 'fulfilled' ? samGov.value : { opportunities: [], total: 0 },
      sbir: sbir.status === 'fulfilled' ? sbir.value : { opportunities: [], total: 0 },
      usaSpending: usaSpending.status === 'fulfilled' ? usaSpending.value : { opportunities: [], total: 0 },
      nihReporter: nihReporter.status === 'fulfilled' ? nihReporter.value : { opportunities: [], total: 0 },
      nsf: nsf.status === 'fulfilled' ? nsf.value : { opportunities: [], total: 0 },
      worldBank: worldBank.status === 'fulfilled' ? worldBank.value : { opportunities: [], total: 0 },
      euFunding: euFunding.status === 'fulfilled' ? euFunding.value : { opportunities: [], total: 0 },
      federalRegister: federalRegister.status === 'fulfilled' ? federalRegister.value : { opportunities: [], total: 0 },
      simplerGrants: simplerGrants.status === 'fulfilled' ? simplerGrants.value : { opportunities: [], total: 0 },
    }

    // Combine all opportunities
    const allOpportunities = [
      ...results.grantsGov.opportunities,
      ...results.samGov.opportunities,
      ...results.sbir.opportunities,
      ...results.usaSpending.opportunities,
      ...results.nihReporter.opportunities,
      ...results.nsf.opportunities,
      ...results.worldBank.opportunities,
      ...results.euFunding.opportunities,
      ...results.federalRegister.opportunities,
      ...results.simplerGrants.opportunities,
    ]

    return Response.json({
      opportunities: allOpportunities,
      total: allOpportunities.length,
      bySource: {
        'Grants.gov': results.grantsGov.total,
        'Simpler.Grants.gov': results.simplerGrants.total,
        'SAM.gov': results.samGov.total,
        'SBIR/STTR': results.sbir.total,
        'USASpending.gov': results.usaSpending.total,
        'NIH RePORTER': results.nihReporter.total,
        'NSF Awards': results.nsf.total,
        'World Bank': results.worldBank.total,
        'EU Funding': results.euFunding.total,
        'Federal Register': results.federalRegister.total,
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
