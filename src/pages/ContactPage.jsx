// src/pages/ContactPage.jsx
import { useState } from "react";
import axios from "axios";
import "./contact.css";

// Resolve API base in this order:
// 1) Vite env (VITE_API_BASE) or CRA env (REACT_APP_API_BASE)
// 2) If on CRA dev server (port 3000) and no env given -> fallback to http://localhost:5000
// 3) Otherwise empty string (assumes you set up a dev proxy)
function resolveApiBase() {
  const viteBase =
    (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) || "";
  const craBase = process.env.REACT_APP_API_BASE || "";
  if (viteBase) return viteBase;
  if (craBase) return craBase;

  // Auto-fallback for CRA dev (common cause of 404)
  if (typeof window !== "undefined" && window.location && window.location.port === "3000") {
    return "http://localhost:5000";
  }
  return "";
}
const API_BASE = resolveApiBase();

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.firstName.trim()) return "First name is required.";
    if (!form.lastName.trim()) return "Last name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Enter a valid email.";
    if (!form.message.trim()) return "Message is required.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const err = validate();
    if (err) return setStatus({ type: "error", msg: err });

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/api/contact`, form, {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
      });

      if (!data?.ok) throw new Error(data?.error || "Failed to send message.");
      setStatus({ type: "success", msg: "Thanks! Your message has been sent. Please check your email." });
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (e2) {
      // axios already normalizes network errors; show a friendly message
      setStatus({ type: "error", msg: e2.message || "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="container contact-wrap">
        <div className="contact-left">
          <h1 className="section-title" style={{ textAlign: "left" }}>Contact</h1>
          <p className="contact-lead">
            Have a project, idea, or question? Send me a message and I’ll get back to you shortly.
          </p>
          <ul className="contact-points">
            <li><i className="fa-solid fa-envelope"></i> artbyzefa@gmail.com</li>
            <li><i className="fab fa-linkedin"></i> linkedin.com/in/huzaifasafdar</li>
            <li><i className="fab fa-instagram"></i> instagram.com/artbyzefa</li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <div className="row-2">
            <div className="form-control">
              <label>First name</label>
              <input name="firstName" value={form.firstName} onChange={onChange} placeholder="Your first name" required />
            </div>
            <div className="form-control">
              <label>Last name</label>
              <input name="lastName" value={form.lastName} onChange={onChange} placeholder="Your last name" required />
            </div>
          </div>

          <div className="form-control">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
          </div>

          <div className="form-control">
            <label>Message</label>
            <textarea name="message" rows="6" value={form.message} onChange={onChange} placeholder="Tell me about your project..." required />
          </div>

          <button className="btn-signup-custom contact-submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status.msg && (
            <div className={`form-status ${status.type === "error" ? "error" : "success"}`}>
              {status.msg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
