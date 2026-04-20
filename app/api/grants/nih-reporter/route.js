export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // NIH RePORTER API v2
    const url = `https://api.reporter.nih.gov/v2/projects/search`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        criteria: {
          advanced_text_search: {
            operator: "and",
            search_field: "projecttitle,abstract,terms",
            search_text: query
          },
          fiscal_years: [new Date().getFullYear(), new Date().getFullYear() + 1]
        },
        offset: 0,
        limit: 100,
        sort_field: "project_start_date",
        sort_order: "desc"
      })
    })

    if (!response.ok) {
      console.error('NIH RePORTER API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const data = await response.json()
    
    const opportunities = (data.results || []).map(project => ({
      id: project.project_num || project.core_project_num,
      title: project.project_title,
      agency: 'National Institutes of Health',
      pi: project.contact_pi_name,
      organization: project.organization?.org_name,
      amount: project.award_amount,
      startDate: project.project_start_date,
      endDate: project.project_end_date,
      fiscalYear: project.fiscal_year,
      description: project.abstract_text || project.project_terms?.join(', ') || '',
      link: `https://reporter.nih.gov/project-details/${project.project_num}`,
      source: 'NIH RePORTER'
    }))

    return Response.json({
      opportunities,
      total: data.meta?.total || opportunities.length
    })
  } catch (error) {
    console.error('NIH RePORTER fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}
