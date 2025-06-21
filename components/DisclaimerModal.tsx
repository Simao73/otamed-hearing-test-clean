import React from "react";

interface Props {
  language: "en" | "gr";
  onClose: () => void;
}

export const DisclaimerModal: React.FC<Props> = ({ language, onClose }) => {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        maxWidth: "500px",
        textAlign: "center",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
      }}>
        <h2>{language === "gr" ? "Αποποίηση Ευθύνης" : "Disclaimer"}</h2>
        <p style={{ marginBottom: "20px" }}>
          {language === "gr"
            ? "Το τεστ αυτό είναι ενδεικτικό και δεν αποτελεί Ιατρική μέτρηση της Ακοής.\n\nΓια μια δωρεάν αξιολόγηση της Ακοής σας: Otamed Ηλιάδης, Περδίκα 79 & Κ. Καραμανλή, Θεσσαλονίκη. ☎️ 2310930434 – otamed.gr"
            : "This test is indicative and does not replace a medical hearing evaluation.\n\nFor a free hearing check-up: Otamed Iliadis, Thessaloniki – ☎️ 2310930434 – otamed.gr"}
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#001f3f",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};
