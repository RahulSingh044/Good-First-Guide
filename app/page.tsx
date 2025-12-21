"use client";
import { useEffect } from "react";
import { AboutSection } from "./components/AboutSection";
import { ContributionGuide } from "./components/ContributionGuide";
import { Hero } from "./components/Hero";
import { OpenSourceBenefits } from "./components/OenSourceBenefits";

export default function Home() {
  useEffect(() => {
    fetch("/api/socket");
  }, []);
  
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSection />
      <OpenSourceBenefits />
      <ContributionGuide />
    </div>
  );
}
