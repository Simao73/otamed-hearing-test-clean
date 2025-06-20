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
  return (
    <div>
      <p>
        {language === "en"
          ? `You heard from ${lowFreq}Hz to ${highFreq}Hz`
          : `Ακούσατε από ${lowFreq}Hz έως ${highFreq}Hz`}
      </p>
      <button onClick={onRestart}>
        {language === "en" ? "New Test" : "Νέο Τεστ"}
      </button>
    </div>
  );
};
