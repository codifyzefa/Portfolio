import { useEffect, useRef } from "react";

export default function VideoSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videoContainer = container.querySelector(".video-container");
    const video = videoContainer?.querySelector("video");
    if (!videoContainer || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoContainer.classList.add("in-view");
            video.muted = true;
            video.play().catch(() => {});
          } else {
            videoContainer.classList.remove("in-view");
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoContainer);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="video-grid-section" ref={containerRef}>
      <div className="video-grid-container">
        <h2 className="video-grid-title">Featured Video</h2>
        <div className="video-grid">
          <div className="video-item">
            <div className="video-container">
              <video src="video.mp4" playsInline  controls={false} />
            </div>
            <div className="video-info">
              <h3 className="video-title">artbyzefa creative process</h3>
              <p className="video-description">
                Innovation is the art of turning ideas into reality, and it thrives on courage, creativity, and
                determination. The path is never easy — challenges will test your limits, and failures will try to shake
                your spirit — but those who never give up turn obstacles into stepping stones. Every moment holds an
                opportunity, sometimes hidden, waiting for those who dare to see it. Keep innovating, keep pushing, and
                keep believing, because the future belongs to those who create it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
