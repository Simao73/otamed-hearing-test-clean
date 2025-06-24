import React from "react";

export const Calibration: React.FC = () => {
  const playTone = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // 1000Hz

    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); // ~40% ένταση
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 2); // 2 δευτερόλεπτα
  };

  return (
    <div style={{ marginTop: "30px", maxWidth: "500px", padding: "20px", backgroundColor: "#002b5c", borderRadius: "10px", color: "white" }}>
      <h2>🎧 Έλεγχος Ήχου</h2>
      <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
        Πατήστε "Δοκιμή Ήχου" για να ακούσετε έναν σταθερό ήχο 1000Hz.
        <br />
        1️⃣ Ξεκινάτε με χαμηλή ένταση. <br />
        2️⃣ Αν δεν τον ακούτε, αυξήστε την ένταση 1 βήμα κάθε φορά. <br />
        3️⃣ Όταν τον ακούσετε καθαρά, συνεχίστε στο τεστ.
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
        🔈 Δοκιμή Ήχου
      </button>
    </div>
  );
};
