import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navbarRef = useRef(null);
  const collapseRef = useRef(null);
  const togglerRef = useRef(null);
  const location = useLocation();

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

  // Close the mobile menu when:
  // 1) a nav link is clicked
  // 2) the route changes (user navigated)
  useEffect(() => {
    const collapseEl = collapseRef.current;
    const togglerEl = togglerRef.current;
    if (!collapseEl) return;

    const closeMenu = () => {
      // If Bootstrap's Collapse is available, use it
      // otherwise fallback to simple class toggle
      try {
        // eslint-disable-next-line no-undef
        const { Collapse } = bootstrap || {};
        if (Collapse) {
          const instance = Collapse.getInstance(collapseEl) || new Collapse(collapseEl, { toggle: false });
          instance.hide();
        } else {
          collapseEl.classList.remove("show");
        }
      } catch {
        collapseEl.classList.remove("show");
      }
      if (togglerEl) {
        togglerEl.classList.add("collapsed");
        togglerEl.setAttribute("aria-expanded", "false");
      }
    };

    // Close if route changed
    closeMenu();

    // Close when any nav link inside the collapse is clicked
    const linkSelector = "a.nav-link, .navbar-brand";
    const links = collapseEl.querySelectorAll(linkSelector);
    links.forEach((a) => a.addEventListener("click", closeMenu));

    return () => {
      links.forEach((a) => a.removeEventListener("click", closeMenu));
    };
  }, [location]);

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
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              ref={togglerRef}
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarContent"
              ref={collapseRef}
            >
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
                {/* Chat */}
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/chat">CHAT</Link>
                </li>
              </ul>

              <div className="d-flex gap-2 navbar-cta">
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
