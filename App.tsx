import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import FeaturedBuilds from "./components/FeaturedBuilds";
import Builder from "./components/Builder";
import Process from "./components/Process";
import About from "./components/About";
import WhyCustom from "./components/WhyCustom";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="grain min-h-screen bg-ink text-bone">
      <a
        href="#builds"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ember focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:tracking-[0.2em] focus:text-ink"
      >
        SKIP TO CONTENT
      </a>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <FeaturedBuilds />
        <Builder />
        <Process />
        <About />
        <WhyCustom />
        <Testimonials />
        <Gallery />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
