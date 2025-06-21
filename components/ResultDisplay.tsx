import React from "react";

interface Props {
  lowFreq: number | null;
  highFreq: number | null;
  language: "en" | "gr";
  onRestart: () => void;
}

export const ResultDisplay: React.FC<Props> = ({
  lowFreq,
  highFreq,
  language,
  onRestart,
}) => {
  const estimateAgeGroup = (freq: number | null) => {
    if (!freq) return { label: "Unknown", emoji: "❓" };
    if (freq > 16000) return { label: language === "gr" ? "18-25 ετών" : "18-25 years", emoji: "🧒🏻" };
    if (freq > 14000) return { label: language === "gr" ? "25-35 ετών" : "25-35 years", emoji: "👱🏻" };
    if (freq > 12000) return { label: language === "gr" ? "35-45 ετών" : "35-45 years", emoji: "👩🏻‍🦱" };
    if (freq > 10000) return { label: language === "gr" ? "45-55 ετών" : "45-55 years", emoji: "👴🏻" };
    return { label: language === "gr" ? "55+ ετών" : "55+ years", emoji: "🧓🏻" };
  };

  const ageGroup = estimateAgeGroup(highFreq);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        {language === "en"
          ? `You heard from ${lowFreq ?? 0}Hz to ${highFreq ?? 0}Hz`
          : `Ακούσατε από ${lowFreq ?? 0}Hz έως ${highFreq ?? 0}Hz`}
      </h2>
      <h3>
        {language === "en" ? "Estimated hearing age:" : "Εκτιμώμενη ακουστική ηλικία:"}{" "}
        {ageGroup.emoji} {ageGroup.label}
      </h3>
      <button
        onClick={onRestart}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        {language === "en" ? "New Test" : "Νέο Τεστ"}
      </button>
    </div>
  );
};
