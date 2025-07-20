import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Replace these with your actual dish/tea names or images!
const items = [
  { label: "Pancakes", emoji: "🥞" },
  { label: "Eggs", emoji: "🍳" },
  { label: "Bagel", emoji: "🥯" },
  { label: "Waffles", emoji: "🧇" },
  { label: "Coffee", emoji: "☕️" },
  { label: "Matcha", emoji: "🍵" },
  { label: "Donut", emoji: "🍩" },
  { label: "Croissant", emoji: "🥐" },
];

const RADIUS = 130; // px, distance from center

export default function LazySusanPage() {
  const [angle, setAngle] = useState(0);
  const startAngle = useRef(0);
  const dragging = useRef(false);

  // Converts (x, y) from center to angle in radians
  const getAngleFromCenter = (x, y) => Math.atan2(y, x);

  // Handle mouse/touch drag
  const onPointerDown = (e) => {
    dragging.current = true;
    const rect = e.target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - cx;
    const dy = clientY - cy;
    startAngle.current = getAngleFromCenter(dx, dy) - angle;
    document.body.style.cursor = "grabbing";
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const susan = document.getElementById("lazy-susan");
    if (!susan) return;
    const rect = susan.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - cx;
    const dy = clientY - cy;
    setAngle(getAngleFromCenter(dx, dy) - startAngle.current);
  };

  const onPointerUp = () => {
    dragging.current = false;
    document.body.style.cursor = "auto";
  };

  // Add/remove global listeners for smooth drag (mobile/desktop)
  // Not the cleanest React style, but simple!
  React.useEffect(() => {
    const move = (e) => onPointerMove(e);
    const up = () => onPointerUp();
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link
        to="/"
        style={{
          marginBottom: 32,
          color: "#FF9F1C",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        ← Back to Home
      </Link>
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        style={{
          fontSize: "2rem",
          marginBottom: "2rem",
          fontWeight: "bold",
          letterSpacing: 2,
        }}
      >
        🍽️ Lazy Susan: Spin for Breakfast!
      </motion.h2>
      <div
        id="lazy-susan"
        style={{
          position: "relative",
          width: 2 * RADIUS + 80,
          height: 2 * RADIUS + 80,
          background: "rgba(255,255,255,0.93)",
          borderRadius: "50%",
          boxShadow: "0 0 48px #fcb69faa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          touchAction: "none",
          userSelect: "none",
          cursor: dragging.current ? "grabbing" : "grab",
          marginBottom: "2rem",
        }}
        onMouseDown={onPointerDown}
        onTouchStart={onPointerDown}
      >
        <motion.div
          animate={{ rotate: (angle * 180) / Math.PI }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          {items.map((item, i) => {
            const theta = (i / items.length) * 2 * Math.PI;
            const x = RADIUS * Math.cos(theta) + RADIUS + 0;
            const y = RADIUS * Math.sin(theta) + RADIUS + 0;
            return (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.22, rotate: 10 }}
                whileTap={{ scale: 0.95, rotate: -10 }}
                transition={{ type: "spring", stiffness: 350, damping: 12 }}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "#FFD966",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  boxShadow: "0 2px 12px #ffb04666",
                  border: "3px solid #ffe29a",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                title={item.label}
              >
                {item.emoji}
              </motion.div>
            );
          })}
        </motion.div>
        {/* Center "plate" */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 100,
            height: 100,
            background: "#fff6e5",
            borderRadius: "50%",
            boxShadow: "0 0 16px #fcb69faa",
            transform: "translate(-50%,-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          🥣
        </div>
      </div>
      <div style={{ color: "#FF9F1C", fontWeight: 500 }}>
        <span>Drag or swipe the circle to spin!</span>
      </div>
    </div>
  );
}
