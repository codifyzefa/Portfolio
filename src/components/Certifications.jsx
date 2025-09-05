import { useState } from "react";

/**
 * HOW TO USE:
 * - Put your certificate files in /public/certs (e.g. /public/certs/google-cybersecurity.pdf)
 * - Add/modify items in CERTS below.
 * - Drop <CertificationsSection /> where you want it (e.g. on Home).
 */

const CERTS = [
  {
    title: "Google Cybersecurity (Professional Certificate)",
    issuer: "Google",
    date: "2025",
    id: "GC-1234-ABCD",
    // use a PDF or an image; both work
    file: "/cys.pdf",
    // optional thumbnail (recommended for images; for PDFs you can skip or provide a PNG/JPG preview)
    thumb: "/cys.jpg",
  },
  {
    title: "CCNA Introduction to Networks",
    issuer: "CISCO",
    date: "2025",
    id: "META-9876-ZYX",
    file: "/ccna.pdf",
    thumb: "/newccna.jpg",
  },
  {
    title: "Summer Internship",
    issuer: "InfoTech Groups Lahore",
    date: "2025",
    id: "MDB-5566",
    file: "/intern.pdf",
    thumb: "/intern.jpg",
  },
];

export default function CertificationsSection() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const onView = (item) => {
    setActive(item);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setActive(null);
  };

  const isPdf = (src = "") => src.toLowerCase().endsWith(".pdf");

  return (
    <section className="certs-section" id="certs">
      <div className="container">
        <h2 className="section-title">Certifications & Licenses</h2>

        <div className="certs-grid">
          {CERTS.map((c, i) => (
            <article key={i} className="cert-card">
              <div className="cert-thumb">
                {c.thumb ? (
                  <img src={c.thumb} alt={`${c.title} thumbnail`} />
                ) : (
                  <div className="cert-thumb-fallback">CERT</div>
                )}
              </div>

              <div className="cert-body">
                <h3 className="cert-title">{c.title}</h3>
                <div className="cert-meta">
                  <span className="pill">{c.issuer}</span>
                  {c.date && <span className="pill">{c.date}</span>}
                
                </div>

                <div className="cert-actions">
                  <button
                    className="btn-signup-custom"
                    onClick={() => onView(c)}
                    aria-label={`View certificate: ${c.title}`}
                  >
                    View Certificate
                  </button>
                
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Light Modal */}
      {open && active && (
        <div className="cert-modal" role="dialog" aria-modal="true">
          <div className="cert-modal-backdrop" onClick={close} />
          <div className="cert-modal-content">
            <div className="cert-modal-header">
              <h4 className="cert-modal-title">{active.title}</h4>
              <button className="cert-modal-close" onClick={close} aria-label="Close">×</button>
            </div>

            <div className="cert-modal-body">
              {isPdf(active.file) ? (
                <object
                  data={active.file}
                  type="application/pdf"
                  className="cert-viewer"
                >
                  <p>
                    PDF preview isn’t available in this browser.{" "}
                    <a href={active.file} target="_blank" rel="noreferrer">Open in a new tab</a>.
                  </p>
                </object>
              ) : (
                <img src={active.file} alt={active.title} className="cert-viewer" />
              )}
            </div>

            <div className="cert-modal-footer">
              <a
                className="btn-signup-custom"
                href={active.file}
                target="_blank"
                rel="noreferrer"
              >
                Open in New Tab
              </a>
              
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
