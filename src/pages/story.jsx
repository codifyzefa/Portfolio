import "./ourstory.css";

export default function OurStoryPage() {
  return (
    <section className="ourstory-wrap">
      {/* ====== Intro / hero-like content block ====== */}
      <div className="story-hero container">
        <div className="hero-copy">
          <h1 className="hero-title">Spreading Better Software — One Build at a Time</h1>
          <p className="hero-sub">
            Who would’ve thought a dorm-room portfolio could grow into a studio
            that ships fast, accessible, and secure web experiences?
          </p>

          <p className="hero-body">
            It started with curiosity and care. The first commits were tiny:
            layouts, buttons, and forms for friends. Then came real products—
            dashboards, APIs, auth flows. We kept one rule: <em>code with empathy</em>.
            Today, ArtbyZefa blends design discipline with engineering depth to
            build software people actually enjoy using.
          </p>

          <div className="hero-cta">
            <a className="btn-signup-custom" href="/portfolio">View Portfolio</a>
            <a className="btn-login-custom" href="/contact">Work With Us</a>
          </div>
        </div>

        
      </div>

      {/* ====== Two-column: sticky mission + long-form story ====== */}
      <div className="story-layout container">
        <aside className="left-rail">
          <div className="mission-card">
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-kicker">
              Code with care. Design with empathy. Ship work that makes the web
              faster, fairer, and more human.
            </p>
            <div className="mission-points">
              <div className="point"><span className="dot" />Delightful, accessible UX.</div>
              <div className="point"><span className="dot" />Mentoring juniors generously.</div>
              <div className="point"><span className="dot" />Solving real problems, simply.</div>
            </div>
            <div className="mission-cta">
              <a className="btn-signup-custom" href="/portfolio">See Work</a>
              <a className="btn-login-custom" href="/contact">Contact</a>
            </div>
          </div>
        </aside>

        <main className="right-content">
          {/* Origin */}
          <section className="story-section">
            <h2 className="h2">Where It Started</h2>
            <p>
              I’m <strong>Zefa</strong>—a developer-artist who treats software like craft.
              Tools evolve, but the craft stays: understand the problem, design simply,
              ship responsibly. <em>Amoo</em> is the heartbeat behind the work: the quiet
              signal that keeps everything in sync—proof that logic and love make
              stronger systems.
            </p>
            <p>
              In networks a reliable connection begins with a handshake. When we met,
              it felt like the perfect three-way handshake—intent, respect, and trust.
              Since then we’ve built a resilient mesh of patience and curiosity.
              When life drops a frame, our retry logic is grace.
            </p>
            <blockquote className="pull-quote">
              “Great systems aren’t only fast—they’re kind to the people who use them.”
            </blockquote>
          </section>

          {/* How we met */}
          <section className="story-section cardish">
            <h2 className="h2">How Amoo &amp; Zefa Met</h2>
            <p>
              Two paths crossed at the right time. What began as friendship grew into
              shared purpose: build things that carry care in their details. Every canvas,
              every component, every commit—shaped by that intent.
            </p>
            <p className="subtle">
              “Behind every piece there’s her laughter, her smile, and the love that
              shaped my journey.”
            </p>
          </section>

          {/* Principles */}
          <section className="story-section">
            <h2 className="h2">Principles We Build With</h2>
            <ul className="principles">
              <li><span className="badge">Clarity</span>Simple interfaces, honest copy, fewer clicks.</li>
              <li><span className="badge">Performance</span>Lazy-load heavy bits, keep UI responsive.</li>
              <li><span className="badge">Accessibility</span>Keyboard first, screen-reader friendly, strong contrast.</li>
              <li><span className="badge">Security</span>OTP + email verify, JWT, validation, least privilege.</li>
              <li><span className="badge">Maintainability</span>Small components, clear boundaries, tests.</li>
            </ul>
          </section>

          {/* What we build / For juniors */}
          <section className="story-section grid-2">
            <div className="panel">
              <h3 className="h3">What We Build</h3>
              <ul className="list">
                <li>React front-ends with clean state and reusable UI.</li>
                <li>Node/Express APIs with secure auth & validations.</li>
                <li>MongoDB schemas tuned for real workflows.</li>
                <li>Email/OTP flows & transactional templates.</li>
                <li>Dashboards, analytics, performance budgets.</li>
              </ul>
            </div>
            <div className="panel">
              <h3 className="h3">For Juniors & Learners</h3>
              <ul className="list">
                <li>Start small: one feature, one component, one test.</li>
                <li>Readability &gt; cleverness. Future-you will thank you.</li>
                <li>Ship. Get feedback. Iterate. Repeat.</li>
                <li>Learn the web platform (HTTP, caching, forms, a11y).</li>
                <li>Build something you would actually use.</li>
              </ul>
            </div>
          </section>

          {/* Mentorship */}
          <section className="story-section cardish">
            <h2 className="h2">Mentorship Promise</h2>
            <p>
              We give practical feedback and real code reviews. If you’re learning
              React, JavaScript, Node, or MERN, we’ll help you move from “tutorials”
              to “shipped”.
            </p>
            <div className="inline-cta">
              <a className="btn-signup-custom" href="/portfolio">See Examples</a>
              <a className="btn-login-custom" href="/contact">Ask for Guidance</a>
            </div>
          </section>

          {/* Ethics */}
          <section className="story-section">
            <h2 className="h2">Ethics & Impact</h2>
            <p>
              Computing shapes real lives. We build for longevity, respect user
              privacy, and choose tools that reduce waste—time, energy, attention.
              Good software should feel calm.
            </p>
          </section>

          {/* ====== Timeline cards (like your reference) ====== */}
         <section className="story-section">
  <h2 className="h2 text-center">Meri Khahani</h2>
  <ol className="timeline">
    <li>
      <div className="t-dot" />
      <div className="t-card">
        <h4>DPS&C Faisalabad – 2011</h4>
        <p>
          My journey began in 2011 with admission to DPS&C Faisalabad, when I was in pre-ninth grade. Struggling with discipline both at home and at school led to frustration from my parents. My father, who is a teacher, decided to withdraw me and enroll me in a government school for my matriculation.
        </p>
      </div>
    </li>
    <li>
      <div className="t-dot" />
      <div className="t-card">
        <h4>Government School (Matric)</h4>
        <p>
          At the government school, my friendships ended abruptly—I had no friends there—but I focused on my studies. With my father's guidance, I worked hard and earned 2nd position in the BISE Faisalabad Board in matric.
        </p>
      </div>
    </li>
    <li>
      <div className="t-dot" />
      <div className="t-card">
        <h4>Punjab College, Faisalabad (PGC)</h4>
        <p>
          After matric, I reunited with friends by attending Punjab College in Faisalabad. I completed my intermediate studies there and graduated with honors.
        </p>
      </div>
    </li>
    <li>
      <div className="t-dot" />
      <div className="t-card">
        <h4>COMSATS Abbottabad – FA’23</h4>
        <p>
          I gained admission to COMSATS University, Abbottabad, in the FA-23 session. I achieved an NTS score of 65. In my first semester, my GPA was 2.98. As of now, I’m in the 5th semester with a cumulative GPA of 3.39; in the most recent semester, I earned a 3.87 GPA.
        </p>
      </div>
    </li>
  </ol>
</section>


          {/* Footer brand line */}
          <footer className="story-end">
  <span className="brand">ARTBYZEFA</span>
  <span className="sep">•</span>
  <span className="tag">Code carefully. Design generously.</span>
</footer>

        </main>
      </div>
    </section>
  );
}
