import ScrollReveal from '@/components/ScrollReveal';
import { FlaskConical, BarChart3, Code, Shield, Globe } from 'lucide-react';

const FEATURES = [
  {
    icon: BarChart3,
    title: 'Comprehensive Analysis',
    description: '50+ physicochemical properties computed from any protein sequence using validated bioinformatics algorithms.',
  },
  {
    icon: Code,
    title: 'Open Source',
    description: 'Full source code available on GitHub. Built with modern web technologies for transparency and collaboration.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All computations run in your browser. Your sequences never leave your device unless you choose to use optional cloud features.',
  },
  {
    icon: Globe,
    title: 'Free Forever',
    description: 'No subscriptions, no usage limits, no accounts required. APARS is free for all researchers worldwide.',
  },
];

const TECH_STACK = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Recharts', category: 'Charts' },
  { name: 'Vite', category: 'Build' },
  { name: 'Lucide', category: 'Icons' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About APARS
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              AI-Powered Protein Analysis and Research Suite — built for the scientific community
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                APARS was created to democratize access to protein analysis tools. We believe that
                every researcher, regardless of institution or funding, should have access to
                high-quality bioinformatics software.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Inspired by tools like ProtParam and ExPASY, APARS brings modern web technology
                to protein analysis — with a clean interface, interactive visualizations, and
                instant results that run entirely in your browser.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you are studying enzyme kinetics, predicting protein stability, or
                characterizing a novel protein, APARS provides the analytical tools you need
                to advance your research.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <img
                src="/about-illustration.png"
                alt="Scientific Research"
                className="w-full max-w-md mx-auto rounded-2xl"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Why APARS?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Designed with researchers in mind
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 100}>
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-full">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
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

      {/* Tech Stack */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Technology Stack
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Built with modern, reliable technologies
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TECH_STACK.map((tech, i) => (
              <ScrollReveal key={tech.name} delay={i * 50}>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                  <p className="font-semibold text-slate-900 dark:text-white">{tech.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{tech.category}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Open Source on GitHub
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              APARS is open source and welcomes contributions from the community.
              Report issues, suggest features, or contribute code.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-xl transition-colors"
            >
              View on GitHub
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
