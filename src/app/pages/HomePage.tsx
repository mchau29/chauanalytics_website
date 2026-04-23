import { useState } from 'react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

/* ─── Cyber stats strip ───────────────────────────────────────────── */
const STATS = [
  { label: 'CONFIDENCE_LVL', val: '95.0%' },
  { label: 'ALPHA_THRES', val: 'α 0.05' },
  { label: 'POWER_CALC', val: 'β 0.80' },
  { label: 'PROTOCOL_STATE', val: 'ACTIVE' },
];

function CyberStatsBar() {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-4 mb-8 md:mb-10">
      {STATS.map(s => (
        <div key={s.label} className="flex items-center gap-2 px-3 py-1.5 bg-[#1B1B1B]/5 border border-black/8">
          <span className="h-1 w-1 rounded-full bg-[#4682B4]" />
          <span className="mono text-[9px] text-slate-500 uppercase tracking-widest">{s.label}</span>
          <span className="mono text-[9px] text-[#4682B4] font-bold">{s.val}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── HomePage ────────────────────────────────────────────────────── */
export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(o => {
      document.body.style.overflow = !o ? 'hidden' : 'auto';
      return !o;
    });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <div className="antialiased [overflow-x:clip]">
      {/* Status Bar */}
      <div className="w-full bg-[#1B1B1B] text-[#E2E2E2] py-1.5 px-4 md:px-8 flex justify-between items-center relative overflow-hidden border-b border-white/5">
        <div className="data-line opacity-40" />
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-[#4682B4] animate-pulse shadow-[0_0_8px_#4682B4]" />
          <span className="text-[9px] mono tracking-[0.2em] sm:tracking-[0.3em] opacity-70 uppercase font-medium">System State: Ready</span>
        </div>
        <span className="text-[9px] mono tracking-[0.3em] opacity-50 uppercase font-light hidden sm:block">
          Reference Protocol: STOCHASTIC_<span className="text-[#4682B4] opacity-100">V2.06</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 lg:static lg:top-auto glass border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-1 md:py-2 flex items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <ImageWithFallback
              src="https://i.ibb.co/bMLxFNT8/logo-new-version.png"
              alt="Chau Analytics Logo"
              className="h-16 md:h-28 w-auto object-contain transition-all duration-500"
            />
          </Link>
          <div className="hidden lg:flex items-center gap-8 mono text-[15px] font-bold uppercase tracking-widest text-[#1B1B1B]">
            <button onClick={() => scrollTo('expertise')} className="hover:text-[#4682B4] transition-colors">Expertise</button>
            <button onClick={() => scrollTo('rigor')} className="hover:text-[#4682B4] transition-colors">Methodology</button>
            <button onClick={() => scrollTo('bio')} className="hover:text-[#4682B4] transition-colors">Credential</button>
            <button
              onClick={toggleModal}
              className="group relative px-6 py-3 bg-[#1B1B1B] text-[#E2E2E2] overflow-hidden transition-all duration-300 hover:shadow-[0_10px_20px_rgba(70,130,180,0.3)]"
            >
              <span className="relative z-10">INITIATE_INQUIRY</span>
              <div className="absolute inset-0 bg-[#4682B4] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>
          <div className="lg:hidden flex items-center gap-3">
            <button onClick={toggleModal} className="group relative flex-shrink-0 px-4 py-2 bg-[#1B1B1B] text-[#E2E2E2] overflow-hidden transition-all duration-300 mono text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
              <span className="relative z-10">Inquiry</span>
              <div className="absolute inset-0 bg-[#4682B4] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
            <button onClick={() => setIsMenuOpen(o => !o)} className="text-[#1B1B1B] focus:outline-none relative z-[60] p-1">
              {!isMenuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              ) : (
                <svg className="w-7 h-7 text-[#1B1B1B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9l-2 2H5a2 2 0 00-2 2v5a2 2 0 012 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
        )}
        <div className={`absolute top-full left-0 w-full bg-white z-50 lg:hidden flex flex-col shadow-xl border-b border-black/5 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col px-6 py-6 space-y-1 mono text-xs text-[#1B1B1B] uppercase tracking-[0.2em] font-bold">
            <button onClick={() => scrollTo('expertise')} className="py-4 px-4 text-left transition-all duration-200 hover:bg-slate-100 hover:text-[#4682B4] border-b border-black/5">Expertise</button>
            <button onClick={() => scrollTo('rigor')} className="py-4 px-4 text-left transition-all duration-200 hover:bg-slate-100 hover:text-[#4682B4] border-b border-black/5">Methodology</button>
            <button onClick={() => scrollTo('bio')} className="py-4 px-4 text-left transition-all duration-200 hover:bg-slate-100 hover:text-[#4682B4]">Credential</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <header className="relative min-h-[65vh] md:min-h-[60vh] flex items-center overflow-hidden bg-[#1B1B1B]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://i.ibb.co/XZWQqmh1/pic-hero-keyboard.png"
            className="w-full h-full object-cover opacity-50"
            alt="Futuristic Lab"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/60 via-black/40 to-gray-300/30" />
        </div>
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10 w-full py-14 md:py-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="h-px w-8 md:w-10 bg-[#4682B4]" />
              <span className="text-[#7ab3d4] mono text-[10px] md:text-xs tracking-widest uppercase font-bold">Laboratory-Grade Analysis</span>
            </div>
            <h1 className="anta text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.95] md:leading-[0.9] mb-6 md:mb-8 break-words">
              Statistical <br /> <span className="text-[#7ab3d4]">Methodology</span> for Human Research.
            </h1>
            <p className="text-base md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light mb-10 md:mb-12 border-l-2 border-white/20 pl-5 md:pl-8">
              Where data meets discipline. Delivering the statistical analysis and study design essential to clinical, nutraceutical, and human performance science.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-5 md:gap-6">
              <Link
                to="/article"
                className="group relative inline-block w-full sm:w-auto bg-[#4682B4] text-white px-8 md:px-10 py-4 md:py-5 text-xs font-bold uppercase tracking-[0.25em] overflow-hidden transition-all duration-300 text-center whitespace-nowrap"
              >
                <span className="relative z-10 group-hover:text-[#1B1B1B] transition-colors duration-300">ABOUT BIOSTATISTICAL R&amp;D</span>
                <div className="absolute inset-0 bg-white transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-[10px] mono text-white uppercase tracking-widest">Validation Stack</span>
                <ImageWithFallback src="https://www.r-project.org/Rlogo.png" className="h-5" alt="R" />
                <ImageWithFallback src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" className="h-5" alt="Python" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Expertise ─────────────────────────────────────────────── */}
      <section id="expertise" className="py-16 md:py-24 bg-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-3">
            <div>
              <span className="text-[#4682B4] mono text-xs tracking-[0.4em] uppercase block mb-3 md:mb-4">Domain Expertise</span>
              <h2 className="anta text-3xl md:text-4xl font-bold tracking-tight uppercase text-[#1B1B1B] leading-none">
                Specialized<br /> <span className="text-[#4682B4]">Practice</span>
              </h2>
            </div>
            <span className="text-slate-400 mono text-xs tracking-widest hidden md:block">V.2026//DEPLOY</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {[
              {
                src: 'https://i.ibb.co/9k6Bzh2g/pic-box1-clinical-pic.jpg',
                alt: 'Clinical', title: 'Clinical Research',
                body: 'Validating treatment efficacy through patient-level analysis and protocol-driven rigor.',
              },
              {
                src: 'https://i.ibb.co/sp5yTrwf/pic-box2-nutraceutical-pic.jpg',
                alt: 'Supplements', title: 'Nutraceutical Efficacy',
                body: 'Mapping the impact of dietary interventions on wellness and health outcomes.',
              },
              {
                src: 'https://i.ibb.co/SDHky7cq/Pic-box3-athlete.jpg',
                alt: 'Mental Health', title: 'Human Behavior',
                body: 'Processing performance metrics. Modeling systemic health and behavior.',
              },
            ].map(card => (
              <div key={card.title} className="group relative min-h-[340px] sm:min-h-[400px] md:min-h-[450px] overflow-hidden bg-[#1B1B1B] flex flex-col">
                <ImageWithFallback src={card.src} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={card.alt} />
                <div className="absolute inset-0 img-overlay" />

                {/* Corner targeting brackets */}
                <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#4682B4]/0 group-hover:border-[#4682B4]/90 transition-all duration-300 z-20" />
                <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#4682B4]/0 group-hover:border-[#4682B4]/90 transition-all duration-300 z-20" />
                <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#4682B4]/0 group-hover:border-[#4682B4]/90 transition-all duration-300 z-20" />
                <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#4682B4]/0 group-hover:border-[#4682B4]/90 transition-all duration-300 z-20" />

                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                  <div className="bg-[#1B1B1B] p-3 md:p-4 w-full mb-3 border-l-4 border-[#4682B4] flex items-center min-h-[60px] md:min-h-[72px]">
                    <h3 className="text-[#E2E2E2] text-sm md:text-[16px] font-bold uppercase tracking-widest">{card.title}</h3>
                  </div>
                  {/* Always visible on mobile/tablet, hover-reveal on desktop */}
                  <p className="text-white text-xs font-medium opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-0 lg:translate-y-4 group-hover:translate-y-0 bg-black/60 p-3 md:p-4 backdrop-blur-sm">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodological Rigor ───────────────────────────────────── */}
      <section
        id="rigor"
        className="py-12 md:py-20 bg-white relative overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(70,130,180,0.045) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          <CyberStatsBar />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left col */}
            <div className="lg:col-span-5">
              <h2 className="anta text-3xl md:text-4xl font-bold mb-6 md:mb-8 tracking-tight uppercase leading-none text-[#1B1B1B]">
                Methodological <br /><span className="text-[#4682B4]">Rigor</span>
              </h2>
              <p className="text-slate-500 font-light mb-8 md:mb-10 leading-relaxed">
                Integrity is our baseline. We employ stringent protocols to ensure your results survive scrutiny—from peer review to the boardroom.
              </p>
              <div className="bg-[#E2E2E2] p-6 md:p-8 border border-black/5">
                <div className="flex gap-4 items-center mb-4">
                  <div className="h-2 w-2 bg-[#4682B4]" />
                  <span className="mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Mission_Statement</span>
                </div>
                <p className="text-sm font-medium italic text-[#1B1B1B]">
                  "To bridge the gap between raw data and objective truth through analytical fidelity."
                </p>
              </div>
            </div>

            {/* Right col — protocol cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
              {[
                {
                  id: '01', label: 'PROTOCOL_01', title: 'Diagnostic & PLANNING',
                  body: 'Establish the Statistical Analysis Plan (SAP) and a priori power analysis. Eliminate bias. Ensure a theory-driven framework.',
                },
                {
                  id: '02', label: 'PROTOCOL_02', title: 'Data Curation',
                  body: 'Systematic de-duplication, outlier treatment, and variable transformation. Clean data for statistical modeling.',
                },
                {
                  id: '03', label: 'PROTOCOL_03', title: 'Inferences & Prediction',
                  body: 'Aligning methodology with core objectives. Depth over complexity. Precision over volume.',
                },
                {
                  id: '04', label: 'PROTOCOL_04', title: 'Rigor Assurance',
                  body: 'Alpha adjustment and model audit. Evaluating statistical significance against real-world practical impact.',
                },
              ].map(card => (
                <div
                  key={card.id}
                  className="p-5 md:p-8 border border-[#E2E2E2] hover:border-[#4682B4]/40 hover:shadow-[0_0_24px_rgba(70,130,180,0.12)] transition-all duration-300 group bg-white relative overflow-hidden"
                >
                  <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#4682B4]/0 group-hover:border-[#4682B4]/50 transition-all duration-300" />
                  <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#4682B4]/0 group-hover:border-[#4682B4]/50 transition-all duration-300" />
                  <span className="text-[#4682B4] mono text-[10px] block mb-3 md:mb-4 font-bold">{card.label}</span>
                  <h4 className="text-base md:text-lg font-bold mb-2 md:mb-3 uppercase tracking-tight">{card.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bio ───────────────────────────────────────────────────── */}
      <section id="bio" className="bg-[#1B1B1B] pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-10 lg:pb-8 text-[#E2E2E2] overflow-hidden relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          {/* Mobile/Tablet heading - shown only on small screens */}
          <div className="lg:hidden mb-12 md:mb-16">
            <h2 className="anta text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-6 md:mb-8">
              Analytics You Can <br /><span className="text-[#4682B4]">Defend.</span>
            </h2>
            <p className="text-slate-400 font-light leading-relaxed mb-8 md:mb-10">
              At Chau Analytics, your goals are our primary focus. Our founder personally directs every analytical workflow and methodology proposal—leveraging his expertise in big data and health research to ensure your project meets the benchmarks of scientific scrutiny.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

            {/* Left — avatar + quote */}
            <div className="flex flex-col items-center h-full">
              <div className="flex justify-center w-full mb-10 lg:mb-12 lg:mt-5">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">

                  {/* Outer slow-rotating dashed ring */}
                  <div
                    className="absolute -inset-7 rounded-full border border-dashed border-[#4682B4]/25"
                    style={{ animation: 'spin 28s linear infinite' }}
                  />
                  {/* Static inner ring */}
                  <div className="absolute -inset-3 rounded-full border border-[#4682B4]/15" />

                  {/* Corner targeting brackets */}
                  <div className="absolute -top-5 -left-5 w-5 h-5 border-t-2 border-l-2 border-[#4682B4]/80" />
                  <div className="absolute -top-5 -right-5 w-5 h-5 border-t-2 border-r-2 border-[#4682B4]/80" />
                  <div className="absolute -bottom-5 -left-5 w-5 h-5 border-b-2 border-l-2 border-[#4682B4]/80" />
                  <div className="absolute -bottom-5 -right-5 w-5 h-5 border-b-2 border-r-2 border-[#4682B4]/80" />

                  {/* Scanning line */}
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-10">
                    <div
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4682B4]/55 to-transparent"
                      style={{ animation: 'avatarScan 4s ease-in-out infinite' }}
                    />
                  </div>

                  {/* Glow halo */}
                  <div className="absolute inset-0 rounded-full shadow-[0_0_48px_rgba(70,130,180,0.22)] pointer-events-none" />

                  {/* Avatar */}
                  <ImageWithFallback
                    src="https://i.ibb.co/gFdCqmKP/pic-professional-headshot.jpg"
                    alt="Minh K. Chau"
                    className="w-full h-full rounded-full object-cover border-2 border-[#4682B4]/40 shadow-2xl"
                  />

                  {/* HUD label — top right */}
                  <div className="absolute -top-1 -right-24 hidden md:flex items-center gap-1.5">
                    <div className="h-px w-6 bg-[#4682B4]/40" />
                    <span className="mono text-[8px] text-[#4682B4]/60 tracking-widest uppercase whitespace-nowrap">ID_VERIFIED</span>
                  </div>

                  {/* HUD label — bottom left */}
                  <div className="absolute -bottom-1 -left-[88px] hidden md:flex items-center gap-1.5">
                    <span className="mono text-[8px] text-[#4682B4]/60 tracking-widest uppercase whitespace-nowrap">PHD_CAND</span>
                    <div className="h-px w-6 bg-[#4682B4]/40" />
                  </div>

                  {/* Side dot stack */}
                  <div className="absolute top-1/2 -right-4 -translate-y-1/2 flex flex-col gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-[#4682B4] animate-pulse" />
                    <span className="h-1 w-1 rounded-full bg-[#4682B4]/40" />
                    <span className="h-1 w-1 rounded-full bg-[#4682B4]/20" />
                  </div>
                </div>
              </div>
              <div className="relative w-full text-center mt-6 lg:mt-auto">
                <blockquote className="italic leading-relaxed text-[#E2E2E2] mb-1 relative text-base md:text-[17px]">
                  Data represents people, products, and public trust. A flawed methodology isn't just an error—it's a liability.
                </blockquote>
                <div className="pt-1 text-center">
                  <p className="mono text-[#4682B4] text-sm uppercase tracking-[0.1em] font-bold">Minh K. Chau</p>
                  <p className="text-[10px] mono text-slate-500 uppercase tracking-[0.1em] mt-1">Founder // Principal Statistician</p>
                </div>
              </div>
            </div>

            {/* Right — credentials */}
            <div className="space-y-10 md:space-y-12">
              <div>
                {/* Desktop heading - shown only on large screens */}
                <h2 className="hidden lg:block anta text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-6 md:mb-8">
                  Analytics You Can <br /><span className="text-[#4682B4]">Defend.</span>
                </h2>
                <p className="hidden lg:block text-slate-400 font-light leading-relaxed max-w-lg mb-8 md:mb-10">
                  At Chau Analytics, your goals are our primary focus. Our founder personally directs every analytical workflow and methodology proposal—leveraging his expertise in big data and health research to ensure your project meets the benchmarks of scientific scrutiny.
                </p>
                <div className="space-y-5 md:space-y-6">
                  <p className="text-[10px] mono text-slate-500 uppercase tracking-[0.3em] mb-4">ACADEMIC_CREDENTIALS // Title_Nodes</p>
                  {[
                    { code: 'PHD-S', title: 'Doctoral Student in Health Sciences', sub: 'Biostatistic // Research Methodology' },
                    { code: 'MS-EP', title: 'MS in Experimental Psychology', sub: 'Behavioral Analytics // Experimental Design' },
                  ].map(cred => (
                    <div key={cred.code} className="flex items-center gap-4 md:gap-6">
                      <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center border border-[#4682B4]/30 bg-[#4682B4]/5 mono text-[10px] font-bold text-[#4682B4]">{cred.code}</div>
                      <div>
                        <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-white">{cred.title}</h4>
                        <p className="text-[9px] mono text-slate-500 uppercase tracking-[0.2em] mt-1">{cred.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Strategic Architecture ────────────────────────────────── */}
      <section className="bg-[#1B1B1B] pt-6 pb-14 md:pt-6 md:pb-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="text-[10px] mono text-slate-500 uppercase tracking-[0.3em] mb-8 md:mb-6">STRATEGIC_ARCHITECTURE // Network_Nodes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 text-left">
            {[
              { src: 'https://i.ibb.co/ksxxd5Y1/o2x-inv-bw.png', alt: 'O2X', sector: 'INDUSTRIAL_HUB', name: 'O2X Human Performance' },
              { src: 'https://i.ibb.co/0pqXk8Y0/subscience-inv-bw.png', alt: 'Substantiation', sector: 'REGULATION_SECTOR', name: 'Substantiation Sciences' },
              { src: 'https://i.ibb.co/hxgM47kr/nova-inv-bw.png', alt: 'NSU', sector: 'INSTRUCTIONAL_CORE', name: 'Nova Southeastern University' },
              { src: 'https://i.ibb.co/DfcCH8Pn/pkp-inv-bw.png', alt: 'PKP', sector: 'SCHOLASTIC_PATH', name: 'Phi Kappa Phi' },
            ].map(node => (
              <div key={node.alt} className="flex items-start gap-4 py-2">
                <div className="flex-shrink-0 h-11 flex items-center justify-center">
                  <ImageWithFallback src={node.src} alt={node.alt} className="h-full w-auto object-contain" />
                </div>
                <div className="border-l border-white/10 pl-4">
                  <p className="text-[9px] mono text-slate-500 mb-2">{node.sector}</p>
                  <p className="text-sm mono text-slate-300 font-medium tracking-tighter uppercase">{node.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white border-y border-black/5">
        <div className="max-w-4xl mx-auto px-5 md:px-6 text-center">
          <h2 className="anta text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-8">
            READY TO DEPLOY YOUR <span className="text-[#4682B4]">SCIENCE?</span>
          </h2>
          <button onClick={toggleModal} className="group relative w-full sm:w-auto bg-[#1B1B1B] text-[#E2E2E2] px-10 md:px-12 py-5 md:py-6 text-xs font-bold uppercase tracking-[0.4em] overflow-hidden transition-all shadow-xl">
            <span className="relative z-10">INITIALIZE UPLINK</span>
            <div className="absolute inset-0 bg-[#4682B4] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="py-8 bg-[#E2E2E2] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-center">
            {/* Column 1: Logo */}
            <div className="flex justify-center lg:justify-start">
              <ImageWithFallback src="https://i.ibb.co/bMLxFNT8/logo-new-version.png" alt="Chau Analytics Logo" className="h-20 md:h-28 w-auto grayscale opacity-80" />
            </div>

            {/* Column 2: Copyright */}
            <div className="flex justify-center text-center">
              <span className="text-[9px] mono text-slate-500 uppercase tracking-[0.4em]">©2026 Chau Analytics / All Rights Reserved</span>
            </div>

            {/* Column 3: Pills */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 md:gap-4">
              <div className="px-3 md:px-4 py-2 bg-white/50 border border-black/5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span className="text-[10px] mono text-slate-600">Tidyverse_Integrated</span>
              </div>
              <div className="px-3 md:px-4 py-2 bg-white/50 border border-black/5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4682B4]" />
                <span className="text-[10px] mono text-slate-600">Statsmodels_Engine</span>
              </div>
              <div className="px-3 md:px-4 py-2 bg-white/80 border border-black/10 flex items-center gap-2 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4682B4] animate-pulse" />
                <span className="text-[10px] mono text-slate-800 font-bold tracking-tighter uppercase">Big_Data_Protocol_Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Inquiry Modal ─────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4">
          <div className="absolute inset-0 bg-[#1B1B1B]/95 backdrop-blur-xl" onClick={toggleModal} />
          <div className="relative w-full max-w-4xl bg-[#E2E2E2] border border-black/10 p-5 md:p-12 shadow-2xl overflow-y-auto max-h-[92vh]">
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <h2 className="text-xl md:text-3xl font-bold tracking-tight text-[#1B1B1B] uppercase">Inquiry_Uplink</h2>
              <button onClick={toggleModal} className="group relative text-white bg-black px-3 md:px-4 py-2 mono text-[10px] uppercase tracking-widest overflow-hidden transition-all flex-shrink-0 ml-4">
                <span className="relative z-10">[ Close_X ]</span>
                <div className="absolute inset-0 bg-[#4682B4] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </div>
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4 md:space-y-6">
              <input type="hidden" name="access_key" value="900ff680-1fe5-4948-bf83-9d14ec1fa910" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input type="text" name="name" required placeholder="Full Name" className="bg-white border border-black/10 p-3 md:p-4 mono text-xs w-full focus:border-[#4682B4] outline-none" />
                <input type="text" name="organization" required placeholder="Organization" className="bg-white border border-black/10 p-3 md:p-4 mono text-xs w-full focus:border-[#4682B4] outline-none" />
                <input type="email" name="email" required placeholder="Email" className="bg-white border border-black/10 p-3 md:p-4 mono text-xs w-full focus:border-[#4682B4] outline-none" />
                <input type="tel" name="phone" placeholder="Phone" className="bg-white border border-black/10 p-3 md:p-4 mono text-xs w-full focus:border-[#4682B4] outline-none" />
              </div>
              <textarea name="message" rows={4} required placeholder="Project Details" className="w-full bg-white border border-black/10 p-3 md:p-4 mono text-xs focus:border-[#4682B4] outline-none" />
              <button type="submit" className="group relative w-full py-4 md:py-5 bg-[#4682B4] text-white font-bold uppercase tracking-[0.3em] text-xs overflow-hidden transition-all">
                <span className="relative z-10">Transmit_Inquiry</span>
                <div className="absolute inset-0 bg-[#1B1B1B] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}