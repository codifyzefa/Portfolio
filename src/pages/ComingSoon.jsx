import { useEffect, useState } from "react";
import "./comingsoon.css";

export default function ComingSoon() {
  const target = new Date();
  target.setDate(target.getDate() + 30);

  const [left, setLeft] = useState(calcLeft(target));
  useEffect(() => {
    const t = setInterval(() => setLeft(calcLeft(target)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="cs-wrap">
      <div className="cs-card">
        <div className="cs-badge">
          <i className="fa-solid fa-rocket-launch" />
          <span>Coming&nbsp;Soon</span>
        </div>

        <h1 className="cs-title">A new ArtbyZefa experience</h1>
        <p className="cs-sub">
          Crafted for speed, clarity, and delight. We’re polishing the last pixels.
        </p>

        <div className="cs-count">
          <TimeCell label="Days"  value={left.days} />
          <TimeCell label="Hours" value={left.hours} />
          <TimeCell label="Min"   value={left.minutes} />
          <TimeCell label="Sec"   value={left.seconds} />
        </div>

        {/* responsive notify form */}
        <form
          className="cs-form"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const email = String(f.get("email") || "").trim();
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
              alert("Please enter a valid email.");
              return;
            }
            alert("Thanks! We’ll notify you at " + email);
            e.currentTarget.reset();
          }}
        >
          <div className="cs-input">
            <i className="fa-regular fa-envelope" />
            <input name="email" type="email" placeholder="you@example.com" />
          </div>
          <button className="btn-signup-custom cs-btn" type="submit">
            Notify Me
          </button>
        </form>

        <div className="cs-links">
          <a href="/portfolio" className="cs-link">
            <i className="fa-solid fa-briefcase" /> Portfolio
          </a>
          <a href="/contact" className="cs-link">
            <i className="fa-solid fa-paper-plane" /> Contact
          </a>

          <div className="cs-social">
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/huzaifasafdar/">
              <i className="fa-brands fa-linkedin" />
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/artbyzefa/">
              <i className="fa-brands fa-instagram" />
            </a>

            
          </div>
        </div>

        <footer className="cs-foot">
          <span className="brand">ARTBYZEFA</span>
          <span className="sep">•</span>
          <span className="tag">Code carefully. Design generously.</span>
        </footer>
      </div>
    </section>
  );
}

function calcLeft(target) {
  const now = Date.now();
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function TimeCell({ label, value }) {
  return (
    <div className="cell">
      <div className="num">{String(value).padStart(2, "0")}</div>
      <div className="lab">{label}</div>
    </div>
  );
}
