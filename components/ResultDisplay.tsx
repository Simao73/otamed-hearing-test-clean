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
   console.log("✅ ResultDisplay loaded. onRestart exists:", typeof onRestart);
  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        {language === "en"
          ? `You heard from ${lowFreq ?? 0}Hz to ${highFreq ?? 0}Hz`
          : `Ακούσατε από ${lowFreq ?? 0}Hz έως ${highFreq ?? 0}Hz`}
      </h2>
    <button
  onClick={() => {
    alert("👉 Click καταγράφηκε!");
    console.log("🔁 onRestart will now fire");
    onRestart();
  }}
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
