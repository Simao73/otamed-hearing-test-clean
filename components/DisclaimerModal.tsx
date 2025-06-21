import React from "react";

export const DisclaimerModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 9999
    }}>
      <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "8px",
        textAlign: "center",
        maxWidth: "400px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)"
      }}>
        <h3>🔊 Ενδεικτικό Τεστ</h3>
        <p>
          Το τεστ αυτό είναι ενδεικτικό και δεν αποτελεί ιατρική μέτρηση.
          Για δωρεάν αξιολόγηση της ακοής σας: <br/>
          <strong>Otamed Ηλιάδης</strong><br/>
          Περδίκα 79 & Κ. Καραμανλή – Θεσσαλονίκη<br/>
          📞 2310 930434 – <a href="https://otamed.gr" target="_blank">otamed.gr</a>
        </p>
        <button onClick={onClose} style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          OK
        </button>
      </div>
    </div>
  );
};
