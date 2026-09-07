import { Nav } from './components/Nav';
import { Hero } from './sections/Hero';
import { Showcase } from './sections/Showcase';
import { DiscoverSection } from './sections/DiscoverSection';
import { FlowSection } from './sections/FlowSection';
import { Features } from './sections/Features';
import { Download } from './sections/Download';
import { About } from './sections/About';
import { Footer } from './sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Showcase />
        <DiscoverSection />
        <FlowSection />
        <Features />
        <Download />
        <About />
      </main>
      <Footer />
    </>
  );
}
