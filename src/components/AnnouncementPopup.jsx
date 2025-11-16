import { useEffect, useRef } from "react";

export default function AnnouncementPopup() {
  const popupRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const popup = popupRef.current;
    const overlay = overlayRef.current;
    if (!popup || !overlay) return;

  
    popup.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";

    const close = () => {
      popup.style.display = "none";
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    };

    overlay.addEventListener("click", close);
    popup.querySelector("#closePopup")?.addEventListener("click", close);

    return () => {
      overlay.removeEventListener("click", close);
      popup.querySelector("#closePopup")?.removeEventListener("click", close);
    };
  }, []);

  return (
    <>
      <div className="announcement-overlay" ref={overlayRef} />
      <div className="announcement-popup" style={{ maxHeight: "70vh", overflowY: "auto" }} ref={popupRef} onClick={(e) => e.stopPropagation()}>
        <button className="close-popup" id="closePopup">&times;</button>
        <div className="announcement-header">Important Announcements</div>

        <div className="announcement-item">
          <strong>𝗰𝗼𝗻𝗻𝗲𝗰𝘁.𝗮𝗿𝘁𝗯𝘆𝘇𝗲𝗳𝗮.𝘁𝗼𝗱𝗮𝘆 𝗶𝘀 𝗡𝗢𝗪 𝗟𝗜𝗩𝗘!</strong><br />
          <p>I’m excited to officially announce the launch of connect.artbyzefa.today — my own web-based video conferencing platform, built to make online communication simple, fast, and accessible for everyone.</p>
          <a href="https://connect.artbyzefa.today">🔗 Try it now: connect.artbyzefa.today</a>
        </div>


        <div className="announcement-item">
          <strong>𝗮𝗺𝗼𝗼𝗻𝗶𝗲𝗲.𝗮𝗿𝘁𝗯𝘆𝘇𝗲𝗳𝗮.𝘁𝗼𝗱𝗮𝘆 𝗶𝘀 𝗖𝗢𝗠𝗜𝗡𝗚 𝗦𝗢𝗢𝗡!</strong><br />
          <p>I’m excited to share that amooniee.artbyzefa.today a new web-based chat platform inspired by the simplicity and speed of WhatsApp on the way!</p>
          <p>Amooniee is being built to offer a clean interface, real-time messaging, and smooth communication directly in the browser, with no app installation required.</p>
          <p>Stay tuned for the official launch and upcoming updates!</p>
          <a href="https://amooniee.artbyzefa.today" id="detailsLink">🔗 Launching soon at: amooniee.artbyzefa.today</a>
        </div>

        <div className="announcement-item">
          <strong>Official Instagram Page</strong><br />
          [<a href="https://www.instagram.com/artbyzefa/" id="detailsLink">Click for Details</a>]
        </div>
        <div className="announcement-item">
          <strong>Launching Notification</strong><br />
          <a href="notification.jpg">Click here for Notification</a>
        </div>
      </div>
    </>
  );
}
