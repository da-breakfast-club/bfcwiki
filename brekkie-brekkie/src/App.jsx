import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sitelets = [
  {
    path: "/fun-button",
    title: "Epic Button",
    emoji: "🥞",
    description: "Press me for serotonin",
  },
  {
    path: "/lazy-susan",
    title: "Lazy Susan",
    emoji: "🍳",
    description: "Spin to see what’s for breakfast",
  },
  {
    path: "/image-buttons",
    title: "Image Buttons",
    emoji: "🃏",
    description: "Again!",
  },
  // Add more as you go
];

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#e0c3fc 0%,#8ec5fc 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        style={{
          fontSize: "3rem",
          marginBottom: "2rem",
          fontWeight: "bold",
          letterSpacing: "0.05em",
        }}
      >
        🥓 Breakfast Club 🥯
      </motion.h1>
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {sitelets.map((sitelet) => (
          <motion.div
            key={sitelet.path}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 32px #8ec5fc88" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              background: "rgba(255,255,255,0.8)",
              borderRadius: "2rem",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            <Link
              to={sitelet.path}
              style={{
                textDecoration: "none",
                color: "#222",
                width: "100%",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                {sitelet.emoji}
              </div>
              <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {sitelet.title}
              </div>
              <div style={{ marginTop: "0.5rem", color: "#444" }}>
                {sitelet.description}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
