import React, { useEffect, useRef } from "react";
import './main.css';

export default function ArtbyZefaLanding() {
  const countdownRef = useRef(null);
  const rotatingBannerRef = useRef(null);
  const navbarRef = useRef(null);
  const popupRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Inject head links (Google Fonts, Bootstrap, Font Awesome)
    const links = [
      [
        "link",
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" },
      ],
      [
        "link",
        { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
      ],
      [
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
        },
      ],
      ["script", { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" }],
    ];
    const created = links.map(([tag, attrs]) => {
      const el = document.createElement(tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
      return el;
    });

    // Countdown timer
    let countdownTimer;
    function updateCountdown() {
      const launchDate = new Date("August 26, 2025 22:00:00").getTime();
      const now = new Date().getTime();
      const distance = launchDate - now;

      const pad2 = (n) => String(Math.max(0, n)).padStart(2, "0");

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const d = document.getElementById("days");
      const h = document.getElementById("hours");
      const m = document.getElementById("minutes");
      const s = document.getElementById("seconds");

      if (d) d.textContent = pad2(days);
      if (h) h.textContent = pad2(hours);
      if (m) m.textContent = pad2(minutes);
      if (s) s.textContent = pad2(seconds);

      if (distance < 0 && countdownRef.current) {
        clearInterval(countdownTimer);
        countdownRef.current.innerHTML = "<div class='countdown-title'>NEW COLLECTION IS NOW LIVE!</div>";
      }
    }

    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);

    // Announcement popup open on mount
    const popup = popupRef.current;
    const overlay = overlayRef.current;
    if (popup && overlay) {
      popup.style.display = "block";
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";

      const close = () => {
        popup.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
      };
      overlay.addEventListener("click", close);
      popup.querySelector("#closePopup")?.addEventListener("click", close);

      // Clean up close listeners on unmount
      return () => {
        overlay.removeEventListener("click", close);
        popup.querySelector("#closePopup")?.removeEventListener("click", close);
      };
    }

    return () => {
      clearInterval(countdownTimer);
      created.forEach((el) => document.head.removeChild(el));
    };
  }, []);

  useEffect(() => {
    // Scroll header & banner behavior
    const rotatingBanner = rotatingBannerRef.current;
    const navbar = navbarRef.current;
    let lastScroll = 0;
    function onScroll() {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        rotatingBanner?.classList.add("hidden");
        navbar?.classList.add("no-banner");
      } else {
        rotatingBanner?.classList.remove("hidden");
        navbar?.classList.remove("no-banner");
      }
      if (currentScroll > 50) navbar?.classList.add("scrolled");
      else navbar?.classList.remove("scrolled");
      lastScroll = currentScroll;
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Video autoplay when in view (works for <video> below)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const container = entry.target;
          const video = container.querySelector("video");
          if (!video) return;
          if (entry.isIntersecting) {
            container.classList.add("in-view");
            video.muted = true;
            video.play().catch(() => {});
          } else {
            container.classList.remove("in-view");
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll(".video-container").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>

      {/* Announcement Overlay & Popup */}
      <div className="announcement-overlay" id="announcementOverlay" ref={overlayRef} />
      <div className="announcement-popup" id="announcementPopup" ref={popupRef} onClick={(e) => e.stopPropagation()}>
        <button className="close-popup" id="closePopup">&times;</button>
        <div className="announcement-header">Important Announcements</div>

        <div className="announcement-item">
          <strong>Welcome to artbyzefa Community</strong> [
          <a href="#" id="detailsLink">Click for Details</a>]
        </div>

        <div className="announcement-item">
          <strong>Launching Notification</strong><br />
          <a href="notification.jpg">Click here for Notification</a>
        </div>

        <div className="announcement-item">
          <strong>Official Instagram Page</strong><br />
          [<a href="https://www.instagram.com/artbyzefa/" id="detailsLink">Click for Details</a>]
        </div>
      </div>

      {/* Rotating Text Banner */}
      <div className="rotating-banner" id="rotatingBanner" ref={rotatingBannerRef}>
        <div className="rotating-text-container">
          <div className="rotating-text">
            {` COMING SOON • ARTBYZEFA • DISCOVER THE POWER OF CODE AND USE IT TO CHANGE THE WORLD • `.repeat(3)}
          </div>
        </div>
      </div>

      {/* Fixed Navigation Bar */}
      <div className="container-fluid navbar-container" id="navbar" ref={navbarRef}>
        <div className="container">
          <nav className="navbar navbar-expand-lg p-0">
            <div className="container-fluid p-0">
              {/* Logo */}
              <a className="navbar-brand logo p-0" href="#">artbyzefa</a>

              {/* Mobile Menu Button */}
              <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* Navigation Content */}
              <div className="collapse navbar-collapse" id="navbarContent">
                {/* Center Navigation */}
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li className="nav-item"><a className="nav-link nav-link-custom" href="#">HOME</a></li>
                  <li className="nav-item"><a className="nav-link nav-link-custom" href="#">OUR STORY</a></li>
                  <li className="nav-item"><a className="nav-link nav-link-custom" href="#">PORTFOLIO</a></li>
                  <li className="nav-item"><a className="nav-link nav-link-custom" href="#">RESOURCES</a></li>
                  <li className="nav-item"><a className="nav-link nav-link-custom" href="#">CONTACT</a></li>
                </ul>

                {/* Right Auth Buttons */}
                <div className="d-flex gap-2">
                  <a href="#" className="btn-login-custom d-none d-lg-inline-flex">BLOG</a>
                  <a href="#" className="btn-signup-custom">SIGN UP</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">ArtbyZefa</h1>
          <p className="hero-subtitle">
            Digital artist creating immersive visual experiences that blend traditional techniques with modern technology.
          </p>
          <div className="slogan">"The Art that Inspires you"</div>
          <div className="hero-buttons">
            <a href="#" className="btn-signup-custom" style={{ height: 48, padding: "0 24px", fontSize: 14 }}>VIEW PORTFOLIO</a>
            <a href="#" className="btn-login-custom" style={{ height: 48, padding: "0 24px", fontSize: 14 }}>COMMISSION WORK</a>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <div className="container countdown-container">
        <h2 className="countdown-title">NEW COLLECTION LAUNCHING IN</h2>
        <div className="countdown" id="countdown" ref={countdownRef}>
          <div className="countdown-item">
            <div className="countdown-number" id="days">00</div>
            <div className="countdown-label">DAYS</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number" id="hours">00</div>
            <div className="countdown-label">HOURS</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number" id="minutes">00</div>
            <div className="countdown-label">MINUTES</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number" id="seconds">00</div>
            <div className="countdown-label">SECONDS</div>
          </div>
        </div>
      </div>

      {/* Urdu Poetry */}
      <div className="container urdu-poetry">
        <p>کوئی اندازہ کر سکتا ہے اس کے زور بازو کا</p>
        <p>نگاہ مرد مومن سے بدل جاتی ہيں تقديريں</p>
      </div>

      {/* Testimonial */}
      <div className="testimonial-section">
        <div className="testimonial-container">
          <div className="testimonial-card">
            <p className="testimonial-text">
              Joining artbyzefa's coding community absolute GAME CHANGER! My coding skills have leveled up like crazy, and I now have access to a massive pool of knowledge, tips, and resources I never imagined existed. The community is fast, responsive, and always ready to help. If you want to become a better coder and be part of an epic learning crew, artbyzefa's community is the way to go!
            </p>
            <p className="testimonial-author">Huzaifa Safdar</p>
            <p className="testimonial-role">Founder, artbyzefa</p>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="video-grid-section">
        <div className="video-grid-container">
          <h2 className="video-grid-title">Featured Video</h2>
          <div className="video-grid">
            <div className="video-item">
              <div className="video-container">
                {/* Using <video> to properly autoplay/pause on visibility */}
                <video src="video.mp4" playsInline muted controls={false} />
              </div>
              <div className="video-info">
                <h3 className="video-title">artbyzefa creative process</h3>
                <p className="video-description">
                  Innovation is the art of turning ideas into reality, and it thrives on courage, creativity, and determination. The path is never easy — challenges will test your limits, and failures will try to shake your spirit — but those who never give up turn obstacles into stepping stones. Every moment holds an opportunity, sometimes hidden, waiting for those who dare to see it. Keep innovating, keep pushing, and keep believing, because the future belongs to those who create it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <div className="footer-columns">
            <div className="footer-column">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Commission Work</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Resources</h3>
              <ul className="footer-links">
                <li><a href="#">Blog</a></li>
                <li><a href="#">Tutorials</a></li>
                <li><a href="#">Art Supplies</a></li>
                <li><a href="#">Inspiration</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Connect</h3>
              <div className="social-links">
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/huzaifasafdar/" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/artbyzefa/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a target="_blank" rel="noreferrer" href="https://x.com/umeizefa?s=21" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              </div>
              <div className="contact-info">
                <p>Email: <a href="mailto:artbyzefa@gmail.com" style={{ color: "var(--gold)" }}>artbyzefa@gmail.com</a></p>
                <p>Commission inquiries welcome</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-text">© 2025 ArtbyZefa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
