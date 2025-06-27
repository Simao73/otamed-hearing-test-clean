import React, { useState, useRef } from "react";
import styles from "../styles/Home.module.css";

interface Props {
  language: "en" | "gr";
  onConfirm: (volumeLevel: string) => void;
}

export const Calibration: React.FC<Props> = ({ language, onConfirm }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
      setTimeout(() => setPlaying(false), 3000);
    }
  };

  const isReady = confirmed && volumeLevel;

  return (
    <div className={styles.calibrationBox}>
      <h2>🎧 {language === "gr" ? "Έλεγχος Ήχου" : "Sound Check"}</h2>
      <p>
        {language === "gr" ? (
          <>
            Πατήστε "Δοκιμή Ήχου" για να ακούσετε έναν σταθερό ήχο 1000Hz.
            <br />
            1️⃣ Ξεκινήστε με χαμηλή ένταση. <br />
            2️⃣ Αν δεν τον ακούτε, αυξήστε την ένταση. <br />
            3️⃣ Όταν τον ακούσετε καθαρά αλλά όχι ενοχλητικά, επιβεβαιώστε και επιλέξτε την ένταση.
          </>
        ) : (
          <>
            Tap "Sound Test" to hear a 1000Hz tone.
            <br />
            1️⃣ Start with low volume. <br />
            2️⃣ Increase if needed. <br />
            3️⃣ When it’s clear but not too loud, confirm and select the level.
          </>
        )}
      </p>

      <audio ref={audioRef} src="/sounds/calibration-1000hz.mp3" preload="auto" className={styles.audioPlayer} />

      <button onClick={handlePlay} className={styles.startButton} style={{ marginTop: "10px" }}>
        {playing ? "🔊 ..." : "🔈 " + (language === "gr" ? "Δοκιμή Ήχου" : "Sound Test")}
      </button>

      <div style={{ marginTop: "10px" }}>
        <label>
          <input type="checkbox" onChange={(e) => setConfirmed(e.target.checked)} />{" "}
          {language === "gr"
            ? "Ναι, τον άκουσα καθαρά χωρίς να είναι ενοχλητικός."
            : "Yes, I heard it clearly and it was not too loud."}
        </label>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>
          {language === "gr" ? "Ποια ήταν η ένταση;" : "What was the volume level?"}
        </label>
        <select
          value={volumeLevel || ""}
          onChange={(e) => setVolumeLevel(e.target.value)}
          style={{ marginTop: "5px", padding: "5px", width: "100%", maxWidth: "300px" }}
        >
          <option value="" disabled>
            {language === "gr" ? "Επιλέξτε επίπεδο έντασης" : "Select volume level"}
          </option>
          <option value="10%">🔈 10%</option>
          <option value="30%">🔉 30%</option>
          <option value="50%">🔊 50%</option>
          <option value="70%">💥 70%+</option>
        </select>
      </div>

      <button
        disabled={!isReady}
        onClick={() => onConfirm(volumeLevel!)}
        style={{
          padding: "10px 24px",
          fontSize: "1rem",
          backgroundColor: isReady ? "#28a745" : "#888",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: isReady ? "pointer" : "not-allowed",
          marginTop: "15px",
        }}
      >
        ✅ {language === "gr" ? "Συνέχεια στο Τεστ" : "Continue to Test"}
      </button>
    </div>
  );
};
