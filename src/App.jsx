import "./main.css";
import { Routes, Route } from "react-router-dom";

import AnnouncementPopup from "./components/AnnouncementPopup";
import RotatingBanner from "./components/RotatingBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import UrduPoetry from "./components/UrduPoetry";
import Testimonial from "./components/Testimonial";
import VideoSection from "./components/VideoSection";
import Footer from "./components/Footer";

// Pages
import Portfolio from "./pages/portfolio";
import ContactPage from "./pages/ContactPage";
import OurStoryPage from "./pages/story";
import ChatPage from "./pages/ChatPage";

// Floating chatbot widget (separate from ChatPage full screen)
import ChatBotWidget from "./components/ChatBotWidget";
import ResourcesPage from "./pages/ResourcesPage";
import ComingSoon from "./pages/ComingSoon";
export default function App() {
  return (
    <>
      <AnnouncementPopup />
      <RotatingBanner />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Countdown />
              <UrduPoetry />
              <Testimonial />
              <VideoSection />
            </>
          }
        />

        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/chat" element={<ChatPage />} /> 
        <Route path="/resources" element={< ResourcesPage />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
 
      </Routes>

      <Footer />

      {/* 👇 Floating chatbot widget (visible everywhere) */}
      <ChatBotWidget />
    </>
  );
}
