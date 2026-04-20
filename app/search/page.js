'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const quickSearches = [
    'Healthcare AI',
    'CCM',
    'Telehealth',
    'Rural Health',
    'Infrastructure',
    'Education',
    'Small Business',
    'Research',
  ]

  async function handleSearch(searchQuery) {
    const q = searchQuery || query
    if (!q.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/grants/all?query=${encodeURIComponent(q)}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
      setResults({ opportunities: [], total: 0, bySource: {} })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚔️</span>
            <span className="text-xl font-bold tracking-tight">TheGrant<span className="text-amber-400">.Ninja</span></span>
          </Link>
          <Link href="/#contact" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Search Section */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Search Grants & RFPs</h1>
          <p className="text-white/60 mb-8 text-lg">Search across federal grant databases in real-time</p>

          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by keyword (e.g., healthcare, infrastructure, education)..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-500/50 transition-colors text-lg"
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-black font-bold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Quick Searches */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-white/40 text-sm">Quick searches:</span>
            {quickSearches.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term)
                  handleSearch(term)
                }}
                className="text-sm bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 px-3 py-1 rounded-lg transition-colors text-white/70 hover:text-amber-400"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Results Summary */}
          {results && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {results.total.toLocaleString()} opportunities found
                </h2>
              </div>

              {/* Source Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(results.bySource || {}).map(([source, count]) => (
                  <div key={source} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-black text-amber-400">{count}</div>
                    <div className="text-white/50 text-sm mt-1">{source}</div>
                  </div>
                ))}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                  <div className="text-3xl font-black text-amber-400">{results.total}</div>
                  <div className="text-amber-400/70 text-sm mt-1 font-semibold">Total Found</div>
                </div>
              </div>

              {/* Results List */}
              {results.opportunities.length > 0 ? (
                <div className="space-y-4">
                  {results.opportunities.map((opp, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-xl p-6 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                              {opp.source}
                            </span>
                            {opp.agency && (
                              <span className="text-xs text-white/40">{opp.agency}</span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-white/90 mb-2">{opp.title}</h3>
                          {opp.description && (
                            <p className="text-white/60 text-sm line-clamp-2 mb-3">
                              {opp.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 text-xs text-white/40">
                            {opp.postedDate && <span>Posted: {new Date(opp.postedDate).toLocaleDateString()}</span>}
                            {opp.closeDate && <span>Closes: {new Date(opp.closeDate).toLocaleDateString()}</span>}
                            {opp.responseDeadline && <span>Deadline: {new Date(opp.responseDeadline).toLocaleDateString()}</span>}
                            {opp.amount && <span>Amount: ${Number(opp.amount).toLocaleString()}</span>}
                          </div>
                        </div>
                        <a
                          href={opp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-black font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
                        >
                          View →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-white/40">
                  No opportunities found for "{query}". Try a different search term.
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!results && !loading && (
            <div className="text-center py-16 text-white/40">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg">Enter a search term to find grants and RFPs</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
