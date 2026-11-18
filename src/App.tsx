import { useCallback, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import { Steps, Why } from "./components/Sections";
import Booking from "./components/Booking";
import { Coverage, Location, Reviews } from "./components/Info";
import { ContactDock, Faq, Footer } from "./components/FaqFooter";

export default function App() {
  const [preset, setPreset] = useState({ device: "", n: 0 });
  const pick = useCallback((device: string) => setPreset((p) => ({ device, n: p.n + 1 })), []);

  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:right-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-brand-red focus:px-4 focus:py-2 focus:text-white"
      >
        تخطَّ إلى المحتوى
      </a>
      <Header />
      <main>
        <Hero />
        <Services onPick={pick} />
        <Why />
        <Steps />
        <Booking preset={preset} />
        <Reviews />
        <Coverage />
        <Location />
        <Faq />
      </main>
      <Footer />
      <ContactDock />
    </>
  );
}
