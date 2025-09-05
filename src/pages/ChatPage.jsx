// src/pages/ChatPage.jsx
import ChatBot from "react-chatbotify";
import { fetchNews, askBrand, askAI } from "../lib/botApi";

const COLORS = { blue: "#4a6cf7", black: "#1a1a1a", gold: "#D4AF37", white: "#ffffff" };

const settings = {
  header: { title: "ArtbyZefa – Chat", showAvatar: false },
  botBubble: { simStream: true },
  userBubble: { showAvatar: false },
  chatHistory: { storageKey: "abz_bot_history_full" },
  general: { embedded: true, showCloseButton: false, showInput: true },
};

const theme = {
  chatWindow: {
    width: "100%",
    height: "calc(100vh - 140px)",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  header: { bgColor: COLORS.black, titleColor: COLORS.white, borderBottom: `2px solid ${COLORS.gold}` },
  botBubble: { bgColor: COLORS.blue, textColor: COLORS.white, borderRadius: 14 },
  userBubble: { bgColor: "#f5f7ff", textColor: COLORS.black, border: "1px solid #e6e8f0", borderRadius: 14 },
  footer: {
    bgColor: "#fff",
    borderTop: "1px solid #eef1f6",
    inputPlaceholder: "Try: react news / web news / our story / contact — or ask any web-dev question",
    sendButtonColor: COLORS.blue,
  },
  fontFamily: "'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, 'Helvetica Neue', Arial",
};

function topicFrom(text = "") {
  const q = text.toLowerCase();
  if (q.includes("react")) return "react";
  if (q.includes("node")) return "node";
  if (q.includes("javascript") || q.includes("js")) return "javascript";
  if (q.includes("web")) return "web";
  return null;
}

const flow = {
  start: {
    message: () =>
      "Welcome to ArtbyZefa. I can open pages, answer brand FAQs, fetch official tech news, and use AI for React/JS/Node/MERN learning.",
    path: "router",
  },

  router: {
    message: async (_params, ctx) => {
      const text = (ctx?.userInput || "").trim();
      const low = text.toLowerCase();

      if (/^(hi|hello|hey|salam|assalam)\b/i.test(low)) {
        return "Hi! Try “portfolio / contact / our story”, “react news”, or ask any web-dev question.";
      }

      if (low.includes("portfolio")) { window.location.href = "/portfolio"; return "Opening portfolio…"; }
      if (low.includes("contact"))   { window.location.href = "/contact";   return "Opening contact…"; }
      if (low.includes("story") || low.includes("amoo")) { window.location.href = "/our-story"; return "Opening Our Story…"; }
      if (/(commission|hire|price)/.test(low)) {
        return "Commissions are open — share scope, style & deadline on the Contact page.";
      }

      try {
        const faq = await askBrand(text);
        if (faq?.ok && faq?.answer) return faq.answer;
      } catch {}

      const topic = topicFrom(text);
      if (topic && /news|update|changelog|blog/.test(low)) {
        try {
          const data = await fetchNews(topic, 5);
          if (data?.ok && data.items?.length) {
            const lines = data.items.map((it) => `• ${it.title} — ${new URL(it.link).host}\n${it.link}`).join("\n\n");
            return `Latest ${data.topic} updates:\n\n${lines}\n\nAsk another topic? (react / javascript / web / node)`;
          }
          return "I couldn’t fetch news right now. Try again in a moment.";
        } catch {
          return "News service is busy. Please try again shortly.";
        }
      }

      // NEW: AI fallback for learning questions
      try {
        const ai = await askAI(text);
        if (ai?.ok && (ai.answer || ai.text)) return ai.answer || ai.text;
      } catch {}

      return 'Try: “react news”, “javascript news”, “web news”, “node news”, or ask a React/JS/Node/MERN question.';
    },
    path: "router",
  },
};

export default function ChatPage() {
  return (
    <section style={{ padding: "1rem", maxWidth: 1200, margin: "0 auto" }}>
      <ChatBot flow={flow} settings={settings} theme={theme} />
    </section>
  );
}
