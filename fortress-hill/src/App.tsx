import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesBlock } from './components/ServicesBlock';
import { TechnologiesBlock } from './components/TechnologiesBlock';
import { PortfolioBlock } from './components/PortfolioBlock';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesBlock />
        <TechnologiesBlock />
        <PortfolioBlock />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
