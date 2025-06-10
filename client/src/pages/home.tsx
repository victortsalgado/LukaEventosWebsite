import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import Portfolio from "@/components/portfolio";
import Journey from "@/components/journey";
import Gallery from "@/components/gallery";
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
        <Journey />
        <Gallery />
        <Portfolio />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}