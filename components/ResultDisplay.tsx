import React from "react";

interface Props {
  lowFreq: number | null;
  highFreq: number | null;
  language: "en" | "gr";
  onRestart: () => void;
}

export const ResultDisplay: React.FC<Props> = ({ lowFreq, highFreq, language, onRestart }) => {
  if (!highFreq) return null;

  const getAgeRange = (freq: number) => {
    if (freq >= 16000) return { age: "20–29", color: "#28a745", label: "🟢" };
    if (freq >= 14000) return { age: "30–39", color: "#85c751", label: "🟢" };
    if (freq >= 12000) return { age: "40–49", color: "#ffc107", label: "🟡" };
    if (freq >= 10000) return { age: "50–59", color: "#ff9800", label: "🟠" };
    return { age: "60+", color: "#dc3545", label: "🔴" };
  };

  const { age, color, label } = getAgeRange(highFreq);
  const positionPercent = Math.min(100, Math.max(0, ((highFreq - 8000) / (16000 - 8000)) * 100));

  return (
    <div style={{ marginTop: "30px", textAlign: "center", color: "#fff" }}>
      <h2>{language === "gr" ? "🧠 Εκτίμηση Ηλικίας Ακοής" : "🧠 Estimated Hearing Age"}</h2>
      <p>
        {language === "gr" ? "Ανώτερη συχνότητα που ακούσατε:" : "Highest frequency you heard:"}{" "}
        <strong>{highFreq} Hz</strong>
      </p>
      <p style={{ fontWeight: "bold", color }}>{label} {language === "gr" ? `Πιθανή ηλικία ακοής: ${age} ετών` : `Estimated hearing age: ${age}`}</p>

      {/* Visual feedback bar */}
      <div style={{
        marginTop: "20px",
        height: "10px",
        width: "90%",
        background: "linear-gradient(to right, #dc3545, #ffc107, #85c751, #28a745)",
        borderRadius: "6px",
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <div
          style={{
            position: "absolute",
            left: `${positionPercent}%`,
            top: "-12px",
            transform: "translateX(-50%)",
            fontSize: "1.2rem",
            color: "#fff"
          }}
        >
          ↑
        </div>
      </div>

      <button
        onClick={onRestart}
        style={{
          marginTop: "30px",
          padding: "12px 30px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem"
        }}
      >
        {language === "gr" ? "Ξανά Τεστ" : "Restart Test"}
      </button>
    </div>
  );
};
