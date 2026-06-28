import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './ui/layout/Navbar';
import Footer from './ui/layout/Footer';
import HomeBanner from './components/user/home/Home-banner';
import Contact from './components/user/contact/Contact';
import About from './components/user/about/About';
import Services from './components/user/services/Services';
import Portraits from './components/user/services/Portraits';
import Weddings from './components/user/services/Weddings';
import Corporate from './components/user/services/Corporate';
import Commercial from './components/user/services/Commercial';
import Packages from './components/user/packages/Packages';
import PackageDetails from './components/user/packages/PackageDetails';
import Gallery from './components/user/gallery/Gallery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomeBanner />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/portraits" element={<Portraits />} />
            <Route path="/services/weddings" element={<Weddings />} />
            <Route path="/services/corporate" element={<Corporate />} />
            <Route path="/services/commercial" element={<Commercial />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/gallery/:id" element={<Gallery />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;