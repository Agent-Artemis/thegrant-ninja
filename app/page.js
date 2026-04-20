'use client'
import { useState } from 'react'

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', grantType: '', amount: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const faqs = [
    {
      q: 'What types of grants do you write?',
      a: 'Federal, state, and local government grants. Foundation and nonprofit grants. SBIR/STTR grants for small businesses. Healthcare, infrastructure, education, rural development, and more. If there\'s a grant for it, we can write it.'
    },
    {
      q: 'What\'s the difference between the options?',
      a: 'Search Access ($97/mo or $970/year) gives you unlimited access to our AI-powered grant search engine. Option A ($2,497) is a flat fee for full application writing. Option B ($997 + 8.5%) is our full-service path with lower upfront cost — we stay with the application through award and only collect our fee if you get funded.'
    },
    {
      q: 'What if I don\'t get the grant?',
      a: 'Under Search Access, you get continuous search capabilities regardless of outcomes. Under Option A, the fee is for writing the application — you own the work. Under Option B, if you\'re not awarded, you owe nothing beyond the initial $997.'
    },
    {
      q: 'What if I want to apply for more than one grant?',
      a: 'Search Access includes unlimited searches. Application writing (Options A & B) is priced separately per application: $2,497 per application under Option A, or $997 + 8.5% per application under Option B. Volume discounts available — ask us.'
    },
    {
      q: 'How fast do you turn around applications?',
      a: 'Typical turnaround is 7–14 business days depending on complexity and deadline. Rush options available. We work around your deadlines, not ours.'
    },
    {
      q: 'I already paid $2,497 for my application. Can I add the completion service?',
      a: 'Yes. Return clients can add the 8.5% completion service without paying a second application fee. You only pay the completion percentage if the grant is awarded.'
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl bg-white rounded-full w-10 h-10 flex items-center justify-center">🥷</span>
            <span className="text-xl font-bold tracking-tight">TheGrant<span className="text-amber-400">.Ninja</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing</a>
            <a href="#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
            <a href="#contact" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 md:py-36 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <span>🥷</span> Expert Grant Writers. Real Results.
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            We Write The Grant.<br />
            <span className="text-amber-400">You Cash The Check.</span>
          </h1>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop leaving money on the table. We handle the entire grant application — research, writing, formatting, submission. You focus on running your organization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#pricing" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg shadow-amber-500/20">
              See Pricing
            </a>
            <a href="#contact" className="w-full sm:w-auto border border-white/20 hover:border-amber-400/50 hover:text-amber-400 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors">
              Talk To Us First
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 px-6 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-amber-400">$2.4M+</div>
            <div className="text-white/50 text-sm mt-1">Grants Secured</div>
          </div>
          <div>
            <div className="text-4xl font-black text-amber-400">94%</div>
            <div className="text-white/50 text-sm mt-1">Application Completion Rate</div>
          </div>
          <div>
            <div className="text-4xl font-black text-amber-400">7–14</div>
            <div className="text-white/50 text-sm mt-1">Day Turnaround</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">How It Works</h2>
          <p className="text-white/50 text-center mb-16 text-lg">Three steps. Zero headaches.</p>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-black text-white/10 mb-4">01</div>
              <h3 className="text-2xl font-bold mb-4">Tell Us About Your Grant</h3>
              <p className="text-white/60 leading-relaxed">Fill out our intake form. Tell us the grant, your organization, and your goals. 10 minutes max.</p>
            </div>
            <div>
              <div className="text-6xl font-black text-white/10 mb-4">02</div>
              <h3 className="text-2xl font-bold mb-4">We Write Everything</h3>
              <p className="text-white/60 leading-relaxed">Our expert writers handle the narrative, budget justification, attachments, and formatting. You review and approve.</p>
            </div>
            <div>
              <div className="text-6xl font-black text-white/10 mb-4">03</div>
              <h3 className="text-2xl font-bold mb-4">Submit & Win</h3>
              <p className="text-white/60 leading-relaxed">We finalize for submission. Under Option B, we stay with the application through award — and only get paid when you do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">Simple Pricing</h2>
          <p className="text-white/50 text-center mb-16 text-lg">Three options. All built around your success.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Search Access */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
              <div className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Search Access</div>
              <div className="text-4xl font-black mb-2">$97<span className="text-2xl text-white/40">/mo</span></div>
              <div className="text-white/50 mb-1">or $970/year</div>
              <div className="text-white/30 text-sm mb-6">(save 2 months)</div>
              <div className="text-lg font-bold mb-6">Grant Discovery</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Unlimited grant searches',
                  'AI-powered matching',
                  'Real-time opportunity alerts',
                  'Deadline tracking',
                  'Multi-source aggregation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70 text-sm">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <a href="https://buy.stripe.com/cNi14o4XVgjj94w00G6kg06" target="_blank" rel="noopener noreferrer" className="block text-center border border-amber-500/50 hover:bg-amber-500/10 text-amber-400 font-semibold py-3 rounded-xl transition-colors text-sm">
                  Monthly — $97
                </a>
                <a href="https://buy.stripe.com/14AfZi7633wx3Kc5l06kg07" target="_blank" rel="noopener noreferrer" className="block text-center border border-amber-500/50 hover:bg-amber-500 hover:text-black text-amber-400 font-bold py-3 rounded-xl transition-colors text-sm">
                  Annual — $970
                </a>
              </div>
            </div>

            {/* Option A */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
              <div className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Option A</div>
              <div className="text-4xl font-black mb-2">$2,497</div>
              <div className="text-white/50 mb-6">Flat fee per application</div>
              <div className="text-lg font-bold mb-6">Application Only</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Full grant application written',
                  'Research & narrative',
                  'Budget justification',
                  'All required attachments',
                  '7–14 day turnaround',
                  'You own the final application',
                  'No contingency — flat fee',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70 text-sm">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="https://buy.stripe.com/dRmdRadurc33a8A4gW6kg02" target="_blank" rel="noopener noreferrer" className="block text-center border border-amber-500/50 hover:bg-amber-500 hover:text-black text-amber-400 font-bold py-4 rounded-xl transition-colors">
                Get Started — $2,497
              </a>
            </div>

            {/* Option B */}
            <div className="bg-amber-500/10 border-2 border-amber-500/50 rounded-2xl p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</div>
              <div className="text-sm font-semibold text-amber-400/70 uppercase tracking-widest mb-4">Option B</div>
              <div className="text-4xl font-black mb-2">$997</div>
              <div className="text-white/50 mb-1">upfront + <span className="text-amber-400 font-bold">8.5%</span> on award</div>
              <div className="text-white/30 text-sm mb-6">We only collect the 8.5% if you get funded</div>
              <div className="text-lg font-bold mb-6">Full-Service Completion</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Option A',
                  'Lower upfront investment',
                  'We stay with application to award',
                  'Active follow-up & responses',
                  'Aligned incentives — we win when you win',
                  '8.5% of awarded amount at close',
                  'Nothing owed if not awarded',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70 text-sm">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="https://buy.stripe.com/4gMbJ22PN3wxcgIcNs6kg03" target="_blank" rel="noopener noreferrer" className="block text-center bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-colors shadow-lg shadow-amber-500/20">
                Get Started — $997 + 8.5%
              </a>
            </div>
          </div>
          <p className="text-center text-white/30 text-sm mt-8">Application writing (Options A & B) priced separately per application. Multiple applications welcome.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">FAQ</h2>
          <p className="text-white/50 text-center mb-16 text-lg">Straight answers to straight questions.</p>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none hover:bg-white/5 transition-colors">
                  <span className="font-semibold text-white/90">{faq.q}</span>
                  <span className="text-amber-400 text-xl group-open:rotate-45 transition-transform flex-shrink-0 ml-4">+</span>
                </summary>
                <div className="px-6 pb-5 text-white/60 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-24 bg-white/[0.02]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">Let&apos;s Get You Funded</h2>
          <p className="text-white/50 text-center mb-12 text-lg">Tell us about your grant. We&apos;ll follow up within 24 hours.</p>
          {formSubmitted ? (
            <div className="text-center bg-amber-500/10 border border-amber-500/30 rounded-2xl p-12">
              <div className="text-5xl mb-4">🥷</div>
              <h3 className="text-2xl font-bold mb-3 text-amber-400">We&apos;re On It.</h3>
              <p className="text-white/60">We&apos;ll contact you within 24 hours to discuss your grant application and get started.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Full Name *</label>
                  <input
                    type="text" required
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Email *</label>
                  <input
                    type="email" required
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="jane@organization.org"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Estimated Grant Amount</label>
                  <input
                    type="text"
                    value={form.amount}
                    onChange={(e) => setForm({...form, amount: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="$50,000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">What kind of grant are you applying for? *</label>
                <textarea
                  required
                  value={form.grantType}
                  onChange={(e) => setForm({...form, grantType: e.target.value})}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                  placeholder="E.g., SBIR Phase I, USDA Rural Development, EPA Environmental Justice, etc."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-colors shadow-lg shadow-amber-500/20"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl bg-white rounded-full w-10 h-10 flex items-center justify-center">🥷</span>
              <span className="text-xl font-bold">TheGrant<span className="text-amber-400">.Ninja</span></span>
            </div>
            <div className="flex items-center gap-8 text-sm text-white/50">
              <a href="#pricing" className="hover:text-white/70 transition-colors">Pricing</a>
              <a href="#how-it-works" className="hover:text-white/70 transition-colors">How It Works</a>
              <a href="#faq" className="hover:text-white/70 transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-white/70 transition-colors">Contact</a>
            </div>
            <div className="text-sm text-white/30">
              © 2026 TheGrant.Ninja
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
