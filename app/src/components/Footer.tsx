import { Link } from 'react-router-dom';
import { FlaskConical, Github, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">APARS</span>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              AI-Powered Protein Analysis and Research Suite. Free, open-source bioinformatics tools for researchers worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Tools</h3>
            <ul className="space-y-2.5">
              <li><Link to="/analyze" className="text-sm hover:text-white transition-colors">Protein Analysis</Link></li>
              <li><Link to="/analyze" className="text-sm hover:text-white transition-colors">FASTA Parser</Link></li>
              <li><Link to="/analyze" className="text-sm hover:text-white transition-colors">pI Calculator</Link></li>
              <li><Link to="/analyze" className="text-sm hover:text-white transition-colors">Hydrophobicity Plot</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li><Link to="/documentation" className="text-sm hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/api-docs" className="text-sm hover:text-white transition-colors">API Reference</Link></li>
              <li><Link to="/help" className="text-sm hover:text-white transition-colors">Tutorial</Link></li>
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li><span className="text-sm hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="text-sm hover:text-white transition-colors cursor-pointer">Terms of Use</span></li>
              <li><span className="text-sm hover:text-white transition-colors cursor-pointer">Citation Guide</span></li>
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} APARS. Open source under MIT License.
          </p>
          <p className="text-sm text-slate-500">
            Built for the scientific community
          </p>
        </div>
      </div>
    </footer>
  );
}
