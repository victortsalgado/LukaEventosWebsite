import { lazy, Suspense } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ClientLogos from "@/components/ClientLogos";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import LazySection from "@/components/LazySection";

// Lazy load heavy components to improve initial page load
const About = lazy(() => import("@/components/about"));
const Services = lazy(() => import("@/components/services"));
const Journey = lazy(() => import("@/components/journey"));
const Gallery = lazy(() => import("@/components/gallery"));

// Loading fallback component
const SectionSkeleton = ({ height = "py-20" }: { height?: string }) => (
  <div className={`${height} bg-gray-50 animate-pulse`}>
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Core above-the-fold content loads immediately */}
        <Hero />
        <ClientLogos />
        
        {/* Heavy sections load on demand */}
        <LazySection rootMargin="200px">
          <Suspense fallback={<SectionSkeleton />}>
            <About />
          </Suspense>
        </LazySection>
        
        <LazySection rootMargin="200px">
          <Suspense fallback={<SectionSkeleton />}>
            <Services />
          </Suspense>
        </LazySection>
        
        <LazySection rootMargin="200px">
          <Suspense fallback={<SectionSkeleton />}>
            <Journey />
          </Suspense>
        </LazySection>
        
        <LazySection rootMargin="150px">
          <Suspense fallback={<SectionSkeleton height="py-16" />}>
            <Gallery />
          </Suspense>
        </LazySection>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}