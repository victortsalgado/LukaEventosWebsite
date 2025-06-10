import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import Portfolio from "@/components/portfolio";
import Journey from "@/components/journey";
import Clients from "@/components/clients";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Journey />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
