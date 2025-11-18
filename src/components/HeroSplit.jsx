export default function HeroSplit() {
  return (
    <section className="hero-split-section" id="home">
      <div className="container hero-split">
       
        <div className="hero-photo">
          <img src="/newprof.jpg" alt="Huzaifa portrait" />
        </div>

        
        <div className="hero-intro">
          <h1 className="hero-name">HUZAIFA SAFDAR</h1>
          <p className="hero-title-tag">Web Developer • Frontend & Full-Stack</p>
         
          <div className="interest-badges">
            <span>React</span>
            <span>JavaScript (ES6+)</span>
            <span>Node.js</span>
            <span>Java</span>
            <span>C/C++</span>
            <span>Network Analysis</span>
            <span>MongoDB</span>
            <span>Bootstrap</span>
            <span>Responsive UI/UX</span>
            <span>Google Certified Cyber Security Artist</span>
            <span>Email Verification & OTP Auth</span>
            <span>JWT & Secure APIs</span>
          </div>

          <p className="hero-blurb">
            I build fast, accessible, and elegant web apps with clean code and thoughtful UX.
            My focus is on performance, scalability, and business impact.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn-signup-custom hero-cta">View Projects</a>
            <a href="#contact" className="btn-login-custom hero-cta">Contact Me</a>
          </div>

          <div className="hero-links">
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/huzaifasafdar/"><i className="fab fa-linkedin"></i></a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/artbyzefa/"><i className="fab fa-instagram"></i></a>
            <a target="_blank" rel="noreferrer" href="https://x.com/umeizefa?s=21"><i className="fab fa-twitter"></i></a>
            <a href="mailto:artbyzefa@gmail.com"><i className="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </section>
  );
}
