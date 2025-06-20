import React from "react";

interface LanguageSelectorProps {
  language: "en" | "gr";
  setLanguage: (lang: "en" | "gr") => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  setLanguage,
}) => {
  return (
    <div style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      display: "flex",
      gap: "10px"
    }}>
      <button
        onClick={() => setLanguage("gr")}
        style={{
          padding: "5px 10px",
          backgroundColor: language === "gr" ? "#007bff" : "#f8f9fa",
          color: language === "gr" ? "white" : "#333",
          border: "1px solid #ddd",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "0.9rem"
        }}
      >
        🇬🇷 ΕΛ
      </button>
      <button
        onClick={() => setLanguage("en")}
        style={{
          padding: "5px 10px",
          backgroundColor: language === "en" ? "#007bff" : "#f8f9fa",
          color: language === "en" ? "white" : "#333",
          border: "1px solid #ddd",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "0.9rem"
        }}
      >
        🇬🇧 EN
      </button>
    </div>
  );
};
