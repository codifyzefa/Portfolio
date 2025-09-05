import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navbarRef = useRef(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    const banner = document.getElementById("rotatingBanner");
    let lastScroll = 0;

    function onScroll() {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        banner?.classList.add("hidden");
        navbar?.classList.add("no-banner");
      } else {
        banner?.classList.remove("hidden");
        navbar?.classList.remove("no-banner");
      }
      if (currentScroll > 50) navbar?.classList.add("scrolled");
      else navbar?.classList.remove("scrolled");

      lastScroll = currentScroll;
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="container-fluid navbar-container" ref={navbarRef}>
      <div className="container">
        <nav className="navbar navbar-expand-lg p-0">
          <div className="container-fluid p-0">
            <Link className="navbar-brand logo p-0" to="/">artbyzefa</Link>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/">HOME</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/our-story">OUR STORY</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/portfolio">PORTFOLIO</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/resources">RESOUCRES</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/contact">CONTACT</Link>
                </li>
                {/* 👇 new Chat link */}
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/chat">CHAT</Link>
                </li>
              </ul>

              <div className="d-flex gap-2">
                <Link className="btn-login-custom d-none d-lg-inline-flex"  to="/coming-soon">BLOG</Link>
                <Link className="btn-signup-custom" to="/coming-soon">SIGN UP</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
