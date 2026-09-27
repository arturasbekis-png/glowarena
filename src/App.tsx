import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Prices } from '@/components/Prices';
import { Events } from '@/components/Events';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-ink-900 text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Prices />
        <Events />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
