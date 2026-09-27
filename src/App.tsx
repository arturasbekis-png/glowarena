import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Prices } from '@/components/Prices';
import { Events } from '@/components/Events';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#080a10] text-white">
      <Header />

      <main className="bg-[#080a10]">
        <Hero />
        <About />
        <Services />
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
