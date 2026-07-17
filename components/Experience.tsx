"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import Starfield from "./Starfield";
import Nav from "./Nav";
import Hero from "./Hero";
import OSOverview from "./OSOverview";
import Now from "./Now";
import Journey from "./Journey";
import SkillsGalaxy from "./SkillsGalaxy";
import MissionControl from "./MissionControl";
import Projects from "./Projects";
import AILab from "./AILab";
import Fitness from "./Fitness";
import Investing from "./Investing";
import Learning from "./Learning";
import Philosophy from "./Philosophy";
import Achievements from "./Achievements";
import TerminalSection from "./TerminalSection";
import Contact from "./Contact";
import Footer from "./Footer";
import AskHamza from "./AskHamza";
import EasterEggs from "./EasterEggs";

// Three.js globe is heavy — load it only on the client, only when needed.
const TravelGlobe = dynamic(() => import("./TravelGlobe"), {
  ssr: false,
  loading: () => <div className="h-[60vh]" />,
});

export default function Experience() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="relative min-h-screen">
      <Preloader onDone={() => setBooted(true)} />
      <Starfield />
      <Cursor />
      {booted && <Nav />}
      <Hero booted={booted} />
      {booted && (
        <>
          <OSOverview />
          <Now />
          <Journey />
          <SkillsGalaxy />
          <MissionControl />
          <Projects />
          <AILab />
          <Fitness />
          <Investing />
          <Learning />
          <TravelGlobe />
          <Philosophy />
          <Achievements />
          <TerminalSection />
          <Contact />
          <Footer />
          <AskHamza />
          <EasterEggs />
        </>
      )}
    </main>
  );
}
