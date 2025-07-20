import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FunButtonPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link
        to="/"
        style={{ textDecoration: "none", color: "#555", marginBottom: "2rem" }}
      >
        ← Home
      </Link>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 24px #FFD966" }}
        whileTap={{ scale: 0.95, rotate: -5 }}
        transition={{ type: "spring", stiffness: 500 }}
        style={{
          background: "#FFD966",
          border: "none",
          borderRadius: "1rem",
          padding: "1.5rem 3rem",
          fontWeight: "bold",
          fontSize: "2rem",
          cursor: "pointer",
        }}
      >
        🍳 You found the fun button!
      </motion.button>
    </div>
  );
}
