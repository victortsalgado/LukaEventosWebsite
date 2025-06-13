import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/services";

import Journey from "@/components/journey";
import Gallery from "@/components/gallery";

import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ClientLogos />
        <About />
        <Services />
        <Journey />
        <Gallery />


        <Contact />
      </main>
      <Footer />
    </div>
  );
}