import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const STORAGE_KEY = 'chau_article_v1';

const DEFAULT_CONTENT = {
  category: 'BIOSTATISTICAL R&D',
  title: 'The Science Behind Biostatistical Research & Development',
  subtitle: 'An editorial primer on methodology, study design, and the standards that make statistical findings defensible.',
  body: `Biostatistical R&D sits at the intersection of rigorous scientific method and applied data science. Unlike exploratory analytics, this discipline demands that every inference be accountable — to the data, to the hypothesis, and ultimately to the population it represents.\n\nAt its core, biostatistics governs how we measure the effect of treatments, interventions, and behavioral exposures in human populations. Whether validating a nutraceutical compound, modeling performance trajectories, or assessing clinical trial outcomes, the statistical framework is not an afterthought — it is the architecture of truth.\n\nThe Statistical Analysis Plan (SAP) precedes any data collection. It establishes the primary and secondary endpoints, defines the analysis population, and documents every analytical decision before a single data point exists. This a priori commitment is what separates defensible science from retrofitted narrative.\n\nPower analysis determines the minimum sample size required to detect a meaningful effect with specified confidence. Inadequate power doesn't just risk a false negative — it undermines the entire evidentiary value of the study. A properly powered study with α = 0.05 and β = 0.20 sets the standard for responsible inference.\n\nMultiplicity correction, mixed-effects modeling, sensitivity analyses, and assumption diagnostics are not optional extensions — they are the baseline expectation for research that survives peer scrutiny. Chau Analytics enforces these standards across every engagement.`,
};

function useAutoSave(data: typeof DEFAULT_CONTENT) {
  const [saved, setSaved] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaved(true);
    }, 800);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [data]);

  return saved;
}

export function ArticlePage() {
  const [content, setContent] = useState<typeof DEFAULT_CONTENT>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_CONTENT;
    } catch {
      return DEFAULT_CONTENT;
    }
  });

  const saved = useAutoSave(content);

  const update = (field: keyof typeof DEFAULT_CONTENT) => (e: React.FormEvent<HTMLElement>) => {
    setContent(c => ({ ...c, [field]: (e.currentTarget as HTMLElement).innerText }));
  };

  return (
    <div className="antialiased min-h-screen bg-[#F7F7F5]">

      {/* Status bar */}
      <div className="w-full bg-[#1B1B1B] text-[#E2E2E2] py-1.5 px-4 md:px-8 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-[#4682B4] animate-pulse shadow-[0_0_8px_#4682B4]" />
          <span className="text-[9px] mono tracking-[0.2em] sm:tracking-[0.3em] opacity-70 uppercase">Article_Editor // Edit Mode Active</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {saved ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] mono text-emerald-400/80 tracking-widest uppercase">Saved</span>
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-[9px] mono text-yellow-400/80 tracking-widest uppercase">Saving…</span>
            </>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 lg:static lg:top-auto glass border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-1 md:py-2 flex items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <ImageWithFallback
              src="https://i.ibb.co/bMLxFNT8/logo-new-version.png"
              alt="Chau Analytics Logo"
              className="h-16 md:h-24 w-auto object-contain"
            />
          </Link>
          <Link
            to="/"
            className="group relative flex-shrink-0 flex items-center gap-2 mono text-[10px] uppercase tracking-widest text-[#E2E2E2] bg-[#1B1B1B] px-5 py-3 overflow-hidden transition-all whitespace-nowrap"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Site
            </span>
            <div className="absolute inset-0 bg-[#4682B4] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
        </div>
      </nav>

      {/* Article body */}
      <main className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-24">

        {/* Category tag */}
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={update('category')}
          className="inline-block mono text-[10px] text-[#4682B4] uppercase tracking-[0.4em] font-bold mb-6 outline-none border-b border-transparent focus:border-[#4682B4]/40 focus:bg-[#4682B4]/5 px-1 py-0.5 transition-all cursor-text"
        >
          {content.category}
        </div>

        {/* Title */}
        <h1
          contentEditable
          suppressContentEditableWarning
          onInput={update('title')}
          className="anta text-3xl md:text-5xl font-bold tracking-tighter leading-tight text-[#1B1B1B] mb-6 outline-none focus:bg-black/[0.02] px-1 -mx-1 transition-colors cursor-text"
        >
          {content.title}
        </h1>

        {/* Subtitle */}
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={update('subtitle')}
          className="text-slate-500 font-light leading-relaxed mb-10 border-l-2 border-[#4682B4]/30 pl-5 outline-none focus:bg-black/[0.02] px-1 transition-colors cursor-text"
        >
          {content.subtitle}
        </p>

        {/* Divider with meta */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-12 pb-8 border-b border-black/8">
          <div className="flex items-center gap-2">
            <ImageWithFallback src="https://i.ibb.co/gFdCqmKP/pic-professional-headshot.jpg" alt="Author" className="w-8 h-8 rounded-full object-cover border border-[#4682B4]/30 flex-shrink-0" />
            <div>
              <p className="mono text-[10px] font-bold text-[#1B1B1B] uppercase tracking-widest">Minh K. Chau</p>
              <p className="mono text-[9px] text-slate-400 uppercase tracking-wider">Principal Statistician</p>
            </div>
          </div>
          <div className="h-8 w-px bg-black/10 hidden sm:block" />
          <div>
            <p className="mono text-[9px] text-slate-400 uppercase tracking-widest">Published</p>
            <p className="mono text-[10px] text-slate-600 uppercase tracking-widest">2026 // Chau Analytics</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/8 sm:ml-auto">
            <span className="h-1 w-1 rounded-full bg-[#4682B4]" />
            <span className="mono text-[9px] text-slate-500 uppercase tracking-widest">R&amp;D Editorial</span>
          </div>
        </div>

        {/* Body — editable rich text area */}
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={update('body')}
          className="outline-none text-slate-700 leading-[1.85] space-y-6 focus:bg-black/[0.015] px-1 -mx-1 transition-colors cursor-text min-h-[400px]"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {content.body}
        </div>

        {/* Bottom sig */}
        <div className="mt-16 pt-10 border-t border-black/8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[#4682B4]" />
            <span className="mono text-[9px] text-slate-400 uppercase tracking-widest">End of Article // Chau Analytics</span>
          </div>
          <Link to="/" className="mono text-[10px] text-[#4682B4] uppercase tracking-widest hover:underline underline-offset-4 whitespace-nowrap">
            ← Return to Main Site
          </Link>
        </div>
      </main>

      {/* ── Article CTA ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#1B1B1B] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-5 md:px-6 text-center">
          <p className="mono text-[10px] text-slate-500 uppercase tracking-[0.4em] mb-4">Ready to begin?</p>
          <h2 className="anta text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter uppercase text-white mb-4">
            DEPLOY YOUR <span className="text-[#4682B4]">SCIENCE</span> WITH US.
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-xl mx-auto mb-10">
            Every engagement starts with a rigorous methodology proposal. Let's build yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="group relative w-full sm:w-auto bg-[#4682B4] text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all shadow-xl text-center whitespace-nowrap"
            >
              <span className="relative z-10 group-hover:text-[#1B1B1B] transition-colors duration-300">INITIATE_INQUIRY</span>
              <div className="absolute inset-0 bg-white transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
            <Link
              to="/"
              className="group relative w-full sm:w-auto border border-white/20 text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all text-center whitespace-nowrap"
            >
              <span className="relative z-10">← Back to Site</span>
              <div className="absolute inset-0 bg-white/5 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}