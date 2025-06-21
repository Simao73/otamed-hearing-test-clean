import React from "react";

interface Props {
  onClose: () => void;
}

export const DisclaimerModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <p style={textStyle}>
          Το τεστ αυτό είναι ενδεικτικό και δεν αποτελεί ιατρική μέτρηση της ακοής.
          Για μία δωρεάν αξιολόγηση της ακοής σας επισκεφθείτε την{" "}
          <strong>Otamed Ηλιάδης</strong> – Περδίκα 79 & Κ. Καραμανλή, Θεσσαλονίκη.
          📞 <strong>2310 930434</strong> – 🌐 <a href="https://otamed.gr" target="_blank" rel="noopener noreferrer">otamed.gr</a>
        </p>
        <button onClick={onClose} style={buttonStyle}>OK</button>
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  padding: "30px",
  borderRadius: "10px",
  maxWidth: "600px",
  width: "90%",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
};

const textStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "#111",
  marginBottom: "20px",
  lineHeight: 1.6,
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  fontSize: "1rem",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
