import React, { useState, useRef } from "react";
import styles from "../styles/Home.module.css";

interface Props {
  language: "en" | "gr";
  onConfirm: () => void;
}

export const Calibration: React.FC<Props> = ({ language, onConfirm }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
      setTimeout(() => setPlaying(false), 2000);
    }
  };

  return (
    <div className={styles.calibrationBox}>
      <h2>🎧 {language === "gr" ? "Έλεγχος Ήχου" : "Sound Check"}</h2>
      <p>
        {language === "gr" ? (
          <>
            Πατήστε "Δοκιμή Ήχου" για να ακούσετε έναν σταθερό ήχο 1000Hz.
            <br />
            1️⃣ Ξεκινήστε με χαμηλή ένταση. <br />
            2️⃣ Αν δεν τον ακούτε, αυξήστε την ένταση 1 βήμα κάθε φορά. <br />
            3️⃣ Όταν τον ακούσετε καθαρά αλλά όχι ενοχλητικά, πατήστε Συνέχεια.
          </>
        ) : (
          <>
            Press "Sound Test" to hear a steady 1000Hz tone.
            <br />
            1️⃣ Start with low volume. <br />
            2️⃣ If you can’t hear it, increase volume step by step. <br />
            3️⃣ When you hear it clearly but not uncomfortably loud, press Continue.
          </>
        )}
      </p>

      <audio
        ref={audioRef}
        src="/sounds/calibration-1000hz.mp3"
        preload="auto"
        className={styles.audioPlayer}
      />

      <button
        onClick={handlePlay}
        className={styles.startButton}
        style={{ marginTop: "10px" }}
      >
        {playing ? "🔊 ..." : "🔈 " + (language === "gr" ? "Δοκιμή Ήχου" : "Sound Test")}
      </button>

      {playing && <div className={styles.waveAnimation}></div>}

      <div style={{ marginTop: "15px" }}>
        <button
          disabled={!confirmed}
          onClick={onConfirm}
          style={{
            padding: "10px 24px",
            fontSize: "1rem",
            backgroundColor: confirmed ? "#28a745" : "#888",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: confirmed ? "pointer" : "not-allowed",
            marginTop: "10px",
          }}
        >
          ✅ {language === "gr" ? "Συνέχεια στο Τεστ" : "Continue to Test"}
        </button>

        {!confirmed && (
          <div style={{ marginTop: "10px" }}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => setConfirmed(e.target.checked)}
              />{" "}
              {language === "gr"
                ? "Ναι, τον άκουσα καθαρά χωρίς να είναι ενοχλητικός."
                : "Yes, I heard it clearly and it was not too loud."}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
