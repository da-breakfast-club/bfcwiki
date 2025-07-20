import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

// Import your images
import img1 from "./assets/Joker.png";
import img2 from "./assets/Hack.png";
import img3 from "./assets/Droll_Joker.png";
import img4 from "./assets/Scholar.png";
import img5 from "./assets/Cavendish.png";

import sound1 from "./assets/multhit2.ogg";

// Optionally, give each button a label or action
const images = [
  { src: img1, label: "One" },
  { src: img2, label: "Two" },
  { src: img3, label: "Three" },
  { src: img4, label: "Four" },
  { src: img5, label: "Five" },
];

export default function ImageButtonsPage() {
  const pitchCounter = useRef(0);
  const audioBufferRef = useRef(null);
  const audioCtxRef = useRef(null);

  async function getAudioBuffer() {
    if (audioBufferRef.current) return audioBufferRef.current;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    const response = await fetch(sound1);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer);
    audioBufferRef.current = audioBuffer;
    return audioBuffer;
  }

  async function playPitchedSound() {
    const pitch = 1 + 0.1 * pitchCounter.current; // increase pitch by 10% per click
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    const audioBuffer = await getAudioBuffer();
    const source = audioCtxRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = pitch;
    source.connect(audioCtxRef.current.destination);
    source.start();
    pitchCounter.current += 1;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #fcb69f 0%, #ffecd2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link
        to="/"
        style={{
          marginBottom: 40,
          color: "#f76d6d",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        ← Back to Home
      </Link>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {images.map((img, i) => (
          <motion.button
            key={img.label}
            whileHover={{
              scale: 1.12,
              rotate: 3,
              boxShadow: "0 0 24px #fcb69f",
            }}
            whileTap={{ scale: 1.3, rotate: -5 }}
            transition={{ type: "spring", stiffness: 1000, damping: 15 }}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              borderRadius: "50%",
              padding: 16,
              margin: 10,
              boxShadow: "0 2px 10px #ffecd288",
              cursor: "pointer",
              width: 100,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            // Add an onClick action if you want!
            //onClick={() => alert(`You clicked ${img.label}!`)}
            onClick={playPitchedSound}
          >
            <img
              src={img.src}
              alt={img.label}
              style={{
                objectFit: "cover",
                pointerEvents: "none", // So only the button receives the click
              }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
