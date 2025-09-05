import { useEffect, useRef } from "react";

export default function RotatingBanner() {
  const ref = useRef(null);

  // just render; scroll logic handled in Navbar (adds/removes .hidden)
  return (
    <div className="rotating-banner" ref={ref} id="rotatingBanner">
      <div className="rotating-text-container">
        <div className="rotating-text">
          {` COMING SOON • ARTBYZEFA • DISCOVER THE POWER OF CODE AND USE IT TO CHANGE THE WORLD • `.repeat(3)}
        </div>
      </div>
    </div>
  );
}
