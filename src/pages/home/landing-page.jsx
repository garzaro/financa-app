import Hero from "@/components/landing/hero.jsx";
import React from "react";
import Navbar from "@/components/template/navbar.jsx";
import Service from "@/components/landing/service.jsx";
import About from "@/components/landing/about.jsx";
import Contact from "@/components/landing/contact.jsx";
import Footer from "@/components/landing/footer.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Service />
        <About />
        <Contact />
        {/*newsLetter*/}
      </main>
      <Footer />
    </div>
  );
}