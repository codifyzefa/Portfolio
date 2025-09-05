// src/components/ChatBotWidget.jsx
import ChatBot from "react-chatbotify";
import { fetchNews, askBrand, askAI } from "../lib/botApi";

const COLORS = { blue: "#4a6cf7", black: "#1a1a1a", gold: "#D4AF37", white: "#ffffff" };

const settings = {
  header: { title: "ArtbyZefa Assistant", showAvatar: false },
  botBubble: { simStream: true },
  userBubble: { showAvatar: false },
  chatHistory: { storageKey: "abz_bot_history" },
  general: { embedded: false, showCloseButton: true, showInput: true, zIndex: 1050 },
};

const theme = {
  chatWindow: {
    width: 360,
    height: 520,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  },
  launcher: { bgColor: COLORS.blue, iconColor: COLORS.white, size: 58, boxShadow: "0 6px 18px rgba(74,108,247,0.35)" },
  header: { bgColor: COLORS.black, titleColor: COLORS.white, borderBottom: `2px solid ${COLORS.gold}` },
  botBubble: { bgColor: COLORS.blue, textColor: COLORS.white, borderRadius: 14 },
  userBubble: { bgColor: "#f5f7ff", textColor: COLORS.black, border: "1px solid #e6e8f0", borderRadius: 14 },
  footer: {
    bgColor: "#fff",
    borderTop: "1px solid #eef1f6",
    inputPlaceholder: "Ask: react news / contact / our story …",
    sendButtonColor: COLORS.blue,
  },
  fontFamily: "'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, 'Helvetica Neue', Arial",
};

function getTopic(text = "") {
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
      "Hi! I can open site pages, answer brand FAQs, fetch official tech news — and use AI for dev study questions (React/JS/Web/Node/MERN).",
    path: "router",
  },

  router: {
    message: async (_params, ctx) => {
      const userText = (ctx?.userInput || "").trim();
      const q = userText.toLowerCase();

      if (/(^|\s)(hi|hello|hey|salam|assalam)/i.test(userText)) {
        return "Hello 👋 Try: portfolio, contact, our story, ‘react news’, or ask any web-dev question.";
      }

      if (q.includes("portfolio")) { window.location.href = "/portfolio"; return "Opening portfolio…"; }
      if (q.includes("contact"))   { window.location.href = "/contact";   return "Opening contact…"; }
      if (q.includes("story") || q.includes("amoo")) { window.location.href = "/our-story"; return "Opening Our Story…"; }

      try {
        const faq = await askBrand(userText);
        if (faq?.ok && faq?.answer) return faq.answer;
      } catch {}

      const topic = getTopic(userText);
      if (topic && /news|update|changelog|blog/.test(q)) {
        try {
          const data = await fetchNews(topic, 4);
          if (data?.ok && data.items?.length) {
            const bullets = data.items.map((it) => `• ${it.title}\n${it.link}`).join("\n\n");
            return `Here’s the latest in ${data.topic}:\n\n${bullets}`;
          }
          return "News service is busy. Please try again.";
        } catch {
          return "Couldn’t reach the news service right now.";
        }
      }

      // NEW: AI fallback for web-dev learning questions
      try {
        const ai = await askAI(userText);
        if (ai?.ok && (ai.answer || ai.text)) return ai.answer || ai.text;
      } catch {}

      return "Try: react news / javascript news / web news / node news — or ask a React/JS/Node/MERN question.";
    },
    path: "router",
  },
};

export default function ChatBotWidget() {
  return <ChatBot flow={flow} settings={settings} theme={theme} />;
}
