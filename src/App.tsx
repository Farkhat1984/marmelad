import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Benefits } from './components/Benefits';
import { Products } from './components/Products';
import { Bundles } from './components/Bundles';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Benefits />
        <Products />
        <Bundles />
        <Partners />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
