export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  
  if (!query) {
    return Response.json({ opportunities: [], total: 0 })
  }

  try {
    // NSF Awards API
    const url = `https://api.nsf.gov/services/v1/awards.json?keyword=${encodeURIComponent(query)}&printFields=id,title,agency,awardee,piFirstName,piLastName,startDate,expDate,fundsObligatedAmt,abstractText&offset=1&limit=25`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('NSF API error:', response.status)
      return Response.json({ opportunities: [], total: 0 })
    }

    const data = await response.json()
    
    const opportunities = (data.response?.award || []).map(award => ({
      id: award.id,
      title: award.title,
      agency: 'National Science Foundation',
      pi: `${award.piFirstName || ''} ${award.piLastName || ''}`.trim(),
      organization: award.awardee,
      amount: award.fundsObligatedAmt,
      startDate: award.startDate,
      endDate: award.expDate,
      description: award.abstractText || '',
      link: `https://www.nsf.gov/awardsearch/showAward?AWD_ID=${award.id}`,
      source: 'NSF Awards'
    }))

    return Response.json({
      opportunities,
      total: parseInt(data.response?.['@attributes']?.total) || opportunities.length
    })
  } catch (error) {
    console.error('NSF fetch error:', error)
    return Response.json({ opportunities: [], total: 0 })
  }
}
