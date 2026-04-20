export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // Federal Register API - search notices
    const url = `https://www.federalregister.gov/api/v1/documents.json?conditions[term]=${encodeURIComponent(query)}&conditions[type][]=NOTICE&per_page=25&order=newest`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Federal Register API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const data = await response.json()
    
    const opportunities = (data.results || []).map(notice => ({
      id: notice.document_number,
      title: notice.title,
      agency: notice.agencies?.[0]?.name,
      type: notice.type,
      publicationDate: notice.publication_date,
      effectiveDate: notice.effective_on,
      cfr: notice.cfr_references?.map(ref => `${ref.title} CFR ${ref.part}`).join(', '),
      description: notice.abstract || notice.action || '',
      link: notice.html_url,
      source: 'Federal Register'
    }))

    return Response.json({
      opportunities,
      total: data.count || opportunities.length
    })
  } catch (error) {
    console.error('Federal Register fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}
