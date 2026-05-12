import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ParticleNetwork from '@/components/ParticleNetwork';
import ScrollReveal from '@/components/ScrollReveal';
import {
  BarChart3,
  Scale,
  Droplets,
  Sun,
  Waves,
  Shield,
  ChevronRight,
  Upload,
  FileText,
  Download,
  Microscope,
} from 'lucide-react';

const FEATURES = [
  {
    icon: BarChart3,
    title: 'Amino Acid Composition',
    description: 'Detailed breakdown of all 20 standard amino acids with molar and mass percentages.',
  },
  {
    icon: Scale,
    title: 'Molecular Weight',
    description: 'Accurate molecular weight calculation including average and monoisotopic values.',
  },
  {
    icon: Droplets,
    title: 'Theoretical pI',
    description: 'Isoelectric point prediction using the pK values of ionizable groups.',
  },
  {
    icon: Sun,
    title: 'Extinction Coefficient',
    description: 'Molar extinction coefficient at 280nm for concentration determination.',
  },
  {
    icon: Waves,
    title: 'Hydrophobicity Analysis',
    description: 'GRAVY score and hydrophobicity plots across the sequence.',
  },
  {
    icon: Shield,
    title: 'Stability Predictions',
    description: 'Instability index, aliphatic index, and half-life estimation.',
  },
];

const STEPS = [
  { num: '01', title: 'Paste Sequence', description: 'Enter your protein sequence or upload a FASTA file.' },
  { num: '02', title: 'Run Analysis', description: 'Our engine computes 50+ physicochemical properties.' },
  { num: '03', title: 'View Results', description: 'Interactive charts, tables, and visualizations.' },
  { num: '04', title: 'Export Report', description: 'Download as PDF, CSV, or JSON for your research.' },
];

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = 1 - Math.pow(2, -10 * progress);
            const current = Math.round(eased * target);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return <span ref={ref}>0</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0">
          <ParticleNetwork />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-8">
              <div className="reveal">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Free &amp; Open Source
                </span>
              </div>

              <div className="reveal" style={{ transitionDelay: '100ms' }}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Analyze Proteins
                  <br />
                  with{' '}
                  <span className="text-blue-600 dark:text-blue-400">Precision</span>
                </h1>
              </div>

              <div className="reveal" style={{ transitionDelay: '200ms' }}>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                  AI-powered physicochemical analysis for researchers. Compute molecular weight, pI,
                  extinction coefficients, and more — in seconds.
                </p>
              </div>

              <div className="reveal flex flex-wrap gap-4" style={{ transitionDelay: '300ms' }}>
                <Link
                  to="/analyze"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25"
                >
                  <Microscope className="w-5 h-5" />
                  Start Analyzing
                </Link>
                <Link
                  to="/documentation"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all"
                >
                  <FileText className="w-5 h-5" />
                  Documentation
                </Link>
              </div>

              <div className="reveal flex flex-wrap gap-6 pt-4" style={{ transitionDelay: '400ms' }}>
                {[
                  { value: '10K+', label: 'Sequences Analyzed' },
                  { value: '50+', label: 'Properties Calculated' },
                  { value: '100%', label: 'Free Forever' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{stat.value}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 reveal" style={{ transitionDelay: '300ms' }}>
              <div className="relative">
                <img
                  src="/hero-molecule.png"
                  alt="Protein Structure"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    { icon: Upload, label: 'FASTA Upload' },
                    { icon: Microscope, label: 'Sequence Input' },
                    { icon: BarChart3, label: 'Visual Reports' },
                    { icon: Download, label: 'Export Data' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Comprehensive Protein Analysis
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              From basic physicochemical properties to advanced structural predictions
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 80}>
                <div className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Analyze in 4 Simple Steps
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Get comprehensive protein analysis in under a minute
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line - desktop only */}
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-dashed border-t-2 border-dashed border-blue-200 dark:border-blue-800" />

            {STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 100} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-blue-600/25 relative z-10">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 10000, suffix: '+', label: 'Sequences Analyzed' },
              { value: 50, suffix: '+', label: 'Properties Calculated' },
              { value: 99.9, suffix: '%', label: 'Uptime' },
              { value: 0, suffix: '', label: 'Cost' },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100} className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                  {stat.value === 99.9 ? (
                    <span>99.9{stat.suffix}</span>
                  ) : stat.value === 0 ? (
                    <span>$0</span>
                  ) : (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Analyze Your Protein?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
              Start analyzing sequences for free. No account required.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25 text-lg"
              >
                <Microscope className="w-5 h-5" />
                Start Analyzing Now
              </Link>
              <Link
                to="/documentation"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Learn More
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
