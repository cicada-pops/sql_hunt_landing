import Nav from './components/Nav';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Cases from './components/Cases';
import DatabaseSchema from './components/DatabaseSchema';
import ProgressSection from './components/ProgressSection';
import Pricing from './components/Pricing';
import Audience from './components/Audience';
import GrantBanner from './components/GrantBanner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      <Nav />
      <Hero />
      <HowItWorks />
      <Cases />
      <DatabaseSchema />
      <ProgressSection />
      <Pricing />
      <Audience />
      <GrantBanner />
      <Footer />
    </div>
  );
}

export default App;
