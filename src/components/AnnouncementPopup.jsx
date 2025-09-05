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
      <div className="announcement-popup" ref={popupRef} onClick={(e) => e.stopPropagation()}>
        <button className="close-popup" id="closePopup">&times;</button>
        <div className="announcement-header">Important Announcements</div>

        <div className="announcement-item">
          <strong>Welcome to artbyzefa Community</strong> [
          <a href="#" id="detailsLink">Click for Details</a>]
        </div>

        <div className="announcement-item">
          <strong>Launching Notification</strong><br />
          <a href="notification.jpg">Click here for Notification</a>
        </div>

        <div className="announcement-item">
          <strong>Official Instagram Page</strong><br />
          [<a href="https://www.instagram.com/artbyzefa/" id="detailsLink">Click for Details</a>]
        </div>
      </div>
    </>
  );
}
