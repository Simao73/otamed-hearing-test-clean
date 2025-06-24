import React, { useState } from "react";

interface Props {
  language: "en" | "gr";
  onConfirm: () => void;
}

export const Calibration: React.FC<Props> = ({ language, onConfirm }) => {
  const [playing, setPlaying] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const playTone = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); // ≈40% ένταση

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    setPlaying(true);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 2);
    setTimeout(() => setPlaying(false), 2000);
  };

  return (
    <div
      style={{
        marginTop: "30px",
        maxWidth: "500px",
        padding: "20px",
        backgroundColor: "#002b5c",
        borderRadius: "10px",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2>🎧 {language === "gr" ? "Έλεγχος Ήχου" : "Sound Check"}</h2>
      <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
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

      <button
        onClick={playTone}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#0070f3",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer",
        }}
      >
        {playing ? "🔊 ..." : "🔈 " + (language === "gr" ? "Δοκιμή Ήχου" : "Sound Test")}
      </button>

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
