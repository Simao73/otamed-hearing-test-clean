
import React from "react";

interface ResultDisplayProps {
  lowFreq: number | null;
  highFreq: number | null;
  language: "en" | "gr";
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  lowFreq,
  highFreq,
  language,
}) => {
  const calculateEarAge = () => {
    if (!lowFreq || !highFreq) return null;

    // Simple ear age calculation based on frequency range
    const range = highFreq - lowFreq;

    if (range > 18000) return { age: "15-25", emoji: "🎉" };
    if (range > 16000) return { age: "25-35", emoji: "😊" };
    if (range > 14000) return { age: "35-45", emoji: "🙂" };
    if (range > 12000) return { age: "45-55", emoji: "😐" };
    if (range > 10000) return { age: "55-65", emoji: "😕" };
    return { age: "65+", emoji: "👴" };
  };

  const result = calculateEarAge();

  const texts = {
    en: {
      yourRange: "Your hearing range:",
      earAge: "Your ear age:",
      lowFreq: "Lowest frequency heard:",
      highFreq: "Highest frequency heard:",
      hz: "Hz",
      years: "years",
      disclaimer: "⚠️ This is just for fun! Not a medical diagnosis.",
      otamedLink: "Visit Otamed.gr for professional hearing care"
    },
    gr: {
      yourRange: "Το εύρος ακοής σου:",
      earAge: "Η ηλικία των αυτιών σου:",
      lowFreq: "Χαμηλότερη συχνότητα:",
      highFreq: "Υψηλότερη συχνότητα:",
      hz: "Hz",
      years: "χρόνια",
      disclaimer: "⚠️ Αυτό είναι μόνο για διασκέδαση! Όχι ιατρική διάγνωση.",
      otamedLink: "Επισκεφτείτε το Otamed.gr για επαγγελματική φροντίδα ακοής"
    }
  };

  const t = texts[language];

  if (!result) return null;

  return (
    <div style={{
      backgroundColor: "#f8f9fa",
      padding: "30px",
      borderRadius: "20px",
      textAlign: "center",
      marginTop: "30px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>
        {result.emoji} {t.earAge} {result.age} {t.years}
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <p><strong>{t.lowFreq}</strong> {lowFreq} {t.hz}</p>
        <p><strong>{t.highFreq}</strong> {highFreq} {t.hz}</p>
      </div>

      <p style={{ 
        color: "#666", 
        fontSize: "0.9rem", 
        marginBottom: "15px" 
      }}>
        {t.disclaimer}
      </p>

      <a 
        href="https://otamed.gr" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          color: "#007bff",
          textDecoration: "none",
          fontSize: "0.9rem"
        }}
      >
        🌐 {t.otamedLink}
      </a>

      <button
        onClick={() => window.location.reload()}
        style={{
          display: "block",
          margin: "20px auto 0",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        {language === "en" ? "Test Again" : "Νέο Τεστ"}
      </button>
    </div>
  );
};
