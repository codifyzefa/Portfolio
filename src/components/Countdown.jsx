import { useEffect, useState } from "react";

export default function Countdown() {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00", done: false });

  useEffect(() => {
    const launchDate = new Date("August 26, 2025 22:00:00").getTime();

    const tick = () => {
      const now = Date.now();
      const distance = launchDate - now;
      if (distance <= 0) {
        setTime({ d: "00", h: "00", m: "00", s: "00", done: true });
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const pad2 = (n) => String(n).padStart(2, "0");
      setTime({ d: pad2(days), h: pad2(hours), m: pad2(minutes), s: pad2(seconds), done: false });
    };

    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="container countdown-container">
      <h2 className="countdown-title">NEW COLLECTION LAUNCHING IN</h2>
      {!time.done ? (
        <div className="countdown">
          <div className="countdown-item">
            <div className="countdown-number">{time.d}</div>
            <div className="countdown-label">DAYS</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number">{time.h}</div>
            <div className="countdown-label">HOURS</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number">{time.m}</div>
            <div className="countdown-label">MINUTES</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number">{time.s}</div>
            <div className="countdown-label">SECONDS</div>
          </div>
        </div>
      ) : (
        <div className="countdown-title">NEW COLLECTION IS NOW LIVE!</div>
      )}
    </div>
  );
}
