import React from "react";

interface Props {
  onClose: () => void;
}

export const DisclaimerModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div style={bannerStyle}>
      <p style={textStyle}>
        Το τεστ αυτό είναι ενδεικτικό και δεν αποτελεί ιατρική μέτρηση της ακοής.
        Για μία δωρεάν αξιολόγηση της ακοής σας επισκεφθείτε την{" "}
        <strong>Otamed Ηλιάδης</strong>, Περδίκα 79 & Κ. Καραμανλή, Θεσσαλονίκη. 📞{" "}
        <strong>2310 930434</strong> –{" "}
        <a href="https://otamed.gr" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
          otamed.gr
        </a>
      </p>
      <button onClick={onClose} style={buttonStyle}>OK</button>
    </div>
  );
};

const bannerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#1a1a1a",
  color: "#fff",
  padding: "15px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 1000,
};

const textStyle: React.CSSProperties = {
  margin: "0 0 10px 0",
  fontSize: "0.95rem",
  lineHeight: 1.5,
  textAlign: "center",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9rem",
};
