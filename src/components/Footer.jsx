export default function Footer() {
  return (
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
  );
}
