import React from "react";

interface Props {
  onClose: () => void;
}

export const DisclaimerModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <p style={textStyle}>
          Το τεστ αυτό είναι ενδεικτικό και δεν αποτελεί ιατρική μέτρηση της ακοής.
          Για μία δωρεάν αξιολόγηση της ακοής σας επισκεφθείτε την{" "}
          <strong>Otamed Ηλιάδης</strong>, Περδίκα 79 & Κ. Καραμανλή, Θεσσαλονίκη. 📞{" "}
          <strong>2310 930434</strong> –{" "}
          <a
            href="https://otamed.gr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0070f3", textDecoration: "underline" }}
          >
            otamed.gr
          </a>
        </p>
        <button onClick={onClose} style={buttonStyle}>OK</button>
      </div>
    </div>
  );
};

const wrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginTop: "40px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#1a1a1a",
  color: "#fff",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "600px",
  width: "90%",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  textAlign: "center",
};

const textStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  lineHeight: 1.6,
  marginBottom: "15px",
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
