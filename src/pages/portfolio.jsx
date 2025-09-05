import "./portfolio.css";
import RotatingBanner from "../components/RotatingBanner";
import Navbar from "../components/Navbar";
import HeroSplit from "../components/HeroSplit";
import ProjectsGrid from "../components/ProjectsGrid";
import AimSection from "../components/AimSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import CertificationsSection from "../components/Certifications";
export default function Portfolio() {
  return (
    <>
      <HeroSplit />
      <ProjectsGrid />
      <CertificationsSection /> 
      <AimSection />
      <CTASection />
      
    </>
  );
}
