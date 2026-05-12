import { Routes, Route } from 'react-router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import Home from '@/pages/Home';
import Analyze from '@/pages/Analyze';
import Documentation from '@/pages/Documentation';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import ApiDocs from '@/pages/ApiDocs';
import Help from '@/pages/Help';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
