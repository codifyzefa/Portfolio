// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----- CORS -----
const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];
const extraOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...defaultOrigins, ...extraOrigins])];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("CORS: origin not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// ----- ENV -----
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  OWNER_EMAIL,           // where you receive leads
  BRAND_NAME = "ArtbyZefa",
  PORT = 5000,
  NODE_ENV,

  // Optional extras for footer
  SITE_URL = "https://artbyzefa.today",
  CONTACT_PHONE = "",
  INSTAGRAM_URL = "https://www.instagram.com/artbyzefa/",
  LINKEDIN_URL = "https://www.linkedin.com/in/huzaifasafdar/",
  X_URL = "https://x.com/umeizefa?s=21",
} = process.env;

// Colors to match your site
const COLORS = {
  blue: "#4a6cf7",
  black: "#1a1a1a",
  gold: "#D4AF37",
  text: "#222222",
  light: "#f5f7ff",
  border: "#e6e8f0",
};

// ----- Transport -----
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

const fromAddress = { name: BRAND_NAME, address: SMTP_USER };

const escapeHtml = (str = "") =>
  String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const devDetails = (err) =>
  NODE_ENV === "production"
    ? undefined
    : {
        code: err?.code,
        responseCode: err?.responseCode,
        command: err?.command,
        message: err?.message,
      };

/* ---------------------------
   Email Templates (table-based, inline styles for broad client support)
----------------------------*/

function emailShell({ preheader = "", title = "", body = "" }) {
  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="color-scheme" content="light only">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${escapeHtml(title)}</title>
    <!-- Preheader (hidden preview text) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${COLORS.blue};">
      <tr>
        <td align="center" style="padding:8px 12px;">
          <span style="font:500 12px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial; color:#fff; letter-spacing:.3px;">
            DISCOVER THE POWER OF CODE AND USE IT TO CHANGE THE WORLD • ARTBYZEFA
          </span>
        </td>
      </tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${COLORS.black};">
      <tr>
        <td align="center" style="padding:22px 12px;">
          <div style="font:800 24px/1 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial; color:#ffffff; letter-spacing:1px;">
            <span style="display:inline-block;padding:8px 14px;border:2px solid ${COLORS.gold};border-radius:6px;">
              ARTBYZEFA
            </span>
          </div>
        </td>
      </tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width:100%;max-width:640px;">
            <tr>
              <td style="padding:24px 20px 8px 20px;border-bottom:1px solid ${COLORS.border};">
                <h1 style="margin:0;font:800 20px/1.3 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial;color:${COLORS.black};">
                  ${escapeHtml(title)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;color:${COLORS.text};font:400 14px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,Helvetica,Arial;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:0 20px 24px 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${COLORS.light};border:1px solid ${COLORS.border};border-radius:10px;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <div style="font:700 13px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial;color:${COLORS.black};margin:0 0 8px 0;">
                        Connect
                      </div>
                      <div style="font:400 13px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial;">
                        <a href="${escapeHtml(LINKEDIN_URL)}" style="color:${COLORS.blue};text-decoration:none;">LinkedIn</a> &nbsp;•&nbsp;
                        <a href="${escapeHtml(INSTAGRAM_URL)}" style="color:${COLORS.blue};text-decoration:none;">Instagram</a> &nbsp;•&nbsp;
                        <a href="${escapeHtml(X_URL)}" style="color:${COLORS.blue};text-decoration:none;">X/Twitter</a>
                        ${CONTACT_PHONE ? `&nbsp;•&nbsp; <span style="color:${COLORS.text};">Phone: ${escapeHtml(CONTACT_PHONE)}</span>` : ""}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:6px 20px 28px 20px;text-align:center;color:#666;font:400 12px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,Helvetica,Arial;">
                © ${new Date().getFullYear()} ${escapeHtml(BRAND_NAME)} • <a href="${escapeHtml(SITE_URL)}" style="color:${COLORS.blue};text-decoration:none;">${escapeHtml(SITE_URL)}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function ownerEmailHtml({ firstName, lastName, email, message }) {
  const title = "New Portfolio Contact";
  const preheader = `${firstName} ${lastName} just sent you a message.`;
  const body = `
    <p style="margin:0 0 14px 0;">You’ve received a new message from your portfolio contact form.</p>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${COLORS.border};border-radius:10px;">
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid ${COLORS.border};">
          <div style="font:700 13px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial;color:${COLORS.black};">Name</div>
          <div style="font:400 14px/1.6">${escapeHtml(firstName)} ${escapeHtml(lastName)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid ${COLORS.border};">
          <div style="font:700 13px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial;color:${COLORS.black};">Email</div>
          <div style="font:400 14px/1.6"><a href="mailto:${escapeHtml(email)}" style="color:${COLORS.blue};text-decoration:none;">${escapeHtml(email)}</a></div>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;">
          <div style="font:700 13px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial;color:${COLORS.black};">Message</div>
          <div style="font:400 14px/1.7;white-space:pre-wrap;">${escapeHtml(message)}</div>
        </td>
      </tr>
    </table>

    <div style="height:14px;"></div>

    <!-- CTA Button (reply) -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left">
      <tr>
        <td bgcolor="${COLORS.black}" style="border-radius:9999px;">
          <a href="mailto:${escapeHtml(email)}"
             style="display:inline-block;padding:12px 18px;font:800 13px/1 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial;
                    color:#fff;text-decoration:none;letter-spacing:.3px;border-radius:9999px;">
             REPLY TO ${escapeHtml(firstName).toUpperCase()}
          </a>
        </td>
      </tr>
    </table>
  `;
  return emailShell({ preheader, title, body });
}

function userEmailHtml({ firstName, message }) {
  const title = `Thanks for contacting ${BRAND_NAME}`;
  const preheader = "We received your message and will get back to you soon.";
  const body = `
    <p style="margin:0 0 14px 0;">Hi <strong>${escapeHtml(firstName)}</strong>,</p>
    <p style="margin:0 0 14px 0;">
      Thank you for reaching out to <strong>${escapeHtml(BRAND_NAME)}</strong>. We’ve received your message and will get back to you shortly.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${COLORS.border};border-radius:10px;background:#fff;">
      <tr>
        <td style="padding:12px 16px;">
          <div style="font:700 13px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial;color:${COLORS.black};">Your message</div>
          <div style="font:400 14px/1.7;white-space:pre-wrap;">${escapeHtml(message)}</div>
        </td>
      </tr>
    </table>

    <div style="height:16px;"></div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left">
      <tr>
        <td bgcolor="${COLORS.blue}" style="border-radius:9999px;">
          <a href="${escapeHtml(SITE_URL)}"
             style="display:inline-block;padding:12px 18px;font:800 13px/1 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial;
                    color:#fff;text-decoration:none;letter-spacing:.3px;border-radius:9999px;">
             VISIT WEBSITE
          </a>
        </td>
      </tr>
    </table>

    <div style="height:8px;"></div>
    <p style="margin:16px 0 0 0;color:#666;font:400 12px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,Helvetica,Arial;">
      If you didn’t request this message, you can safely ignore it.
    </p>
  `;
  return emailShell({ preheader, title, body });
}

/* ---------------------------
   Health + Contact
----------------------------*/
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, service: "contact-api" })
);

app.get("/api/verify-smtp", async (_req, res) => {
  try {
    await transporter.verify();
    res.json({ ok: true });
  } catch (err) {
    console.error("SMTP verify failed:", err);
    res.status(500).json({ ok: false, error: "SMTP verify failed", details: devDetails(err) });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body || {};
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email." });
    }

    // 1) to OWNER
    let ownerMail;
    try {
      ownerMail = await transporter.sendMail({
        from: fromAddress,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `New portfolio contact: ${firstName} ${lastName}`,
        html: ownerEmailHtml({ firstName, lastName, email, message }),
        text: `New contact\n\nName: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    } catch (err) {
      console.error("Send to owner failed:", err);
      return res.status(500).json({ error: "Failed to send to owner inbox.", details: devDetails(err) });
    }

    // 2) auto-reply to USER
    let userMail;
    try {
      userMail = await transporter.sendMail({
        from: fromAddress,
        to: email,
        subject: `Thanks for contacting ${BRAND_NAME}`,
        html: userEmailHtml({ firstName, message }),
        text: `Hi ${firstName},\n\nThanks for contacting ${BRAND_NAME}. We received your message and will get back to you soon.\n\nYour message:\n${message}\n\nBest,\n${BRAND_NAME}`,
      });
    } catch (err) {
      console.error("Auto-reply failed:", err);
      return res.status(500).json({ error: "Failed to send auto-reply.", details: devDetails(err) });
    }

    res.json({ ok: true, ownerMailId: ownerMail.messageId, userMailId: userMail.messageId });
  } catch (err) {
    console.error("Contact error (unexpected):", err);
    res.status(500).json({ error: "Server error.", details: devDetails(err) });
  }
});

app.listen(Number(PORT), () => {
  console.log(`API running on http://localhost:${PORT}`);
});
