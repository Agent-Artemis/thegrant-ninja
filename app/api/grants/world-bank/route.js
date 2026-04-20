export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // World Bank Projects API
    const url = `https://search.worldbank.org/api/v2/projects?format=json&qterm=${encodeURIComponent(query)}&rows=25`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('World Bank API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const data = await response.json()
    
    const opportunities = (data.projects?.project || []).map(project => ({
      id: project.id,
      title: project.project_name,
      agency: 'World Bank',
      country: project.countryshortname,
      sector: project.sector1?.Name,
      status: project.status,
      amount: project.lendprojectcost,
      boardApprovalDate: project.boardapprovaldate,
      closingDate: project.closingdate,
      description: project.project_abstract?.cdata || '',
      link: project.url,
      source: 'World Bank Projects'
    }))

    return Response.json({
      opportunities,
      total: data.total || opportunities.length
    })
  } catch (error) {
    console.error('World Bank fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}
