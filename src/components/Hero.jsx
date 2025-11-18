export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container center-hero">
        <h1 className="hero-title">ArtbyZefa</h1>
        <p className="hero-subtitle">
          Digital artist creating immersive visual experiences that blend traditional techniques with modern technology.
        </p>
        <div className="slogan">"The Art that Inspires you"</div>
        <div className="hero-buttons">
          <a href="/portfolio" className="btn-signup-custom" style={{ height: 48, padding: "0 24px", fontSize: 14 }}>VIEW PORTFOLIO</a>
          <a href="https://github.com/codifyzefa" className="btn-login-custom" style={{ height: 48, padding: "0 24px", fontSize: 14 }}>Git Hub</a>
        </div>
      </div>
    </section>
  );
}
