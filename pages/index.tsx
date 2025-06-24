import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { EarButton } from "../components/EarButton";
import { ResultDisplay } from "../components/ResultDisplay";
import { LanguageSelector } from "../components/LanguageSelector";
import { translations } from "../utils/translations";
import { DisclaimerModal } from "../components/DisclaimerModal";

export default function Home() {
  const [stage, setStage] = useState<"calibration" | "ready" | "start" | "testing" | "done">("calibration");
  const [lowFreq, setLowFreq] = useState<number | null>(null);
  const [highFreq, setHighFreq] = useState<number | null>(null);
  const [language, setLanguage] = useState<"en" | "gr">("gr");
  const [countdown, setCountdown] = useState(3);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const t = translations[language];

  useEffect(() => {
    if (stage === "ready" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && stage === "ready") {
      setStage("start");
    }
  }, [countdown, stage]);

  useEffect(() => {
    if (stage === "done") {
      setShowDisclaimer(true);
    }
  }, [stage]);

  const handleStartTest = () => {
    setStage("testing");
  };

  const restartTest = () => {
    setLowFreq(null);
    setHighFreq(null);
    setCountdown(3);
    setStage("ready");
  };

  return (
    <>
      <Head>
        <title>Otamed Ear Age Test</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.logo}>
          <Image src="/logo/otamed-logo.png" alt="Otamed" width={300} height={100} />
        </div>

        <LanguageSelector language={language} setLanguage={setLanguage} />

        <h1 className={styles.heading}>{t.title}</h1>
        {stage === "calibration" && (
  <>
    <p>
      {language === "gr"
        ? "Πατήστε Play και βεβαιωθείτε ότι ακούτε τον ήχο καθαρά."
        : "Tap Play and make sure you can hear the sound clearly."}
    </p>
    <audio controls autoPlay style={{ marginTop: "1rem" }}>
      <source src="/sounds/calibration-1000hz.mp3" type="audio/mp3" />
      {language === "gr"
        ? "Ο browser σας δεν υποστηρίζει αναπαραγωγή ήχου."
        : "Your browser does not support audio playback."}
    </audio>
    <button
      className={styles.startButton}
      onClick={() => setStage("ready")}
      style={{ marginTop: "1rem" }}
    >
      {language === "gr" ? "Ναι, τον άκουσα" : "Yes, I heard it"}
    </button>
  </>
)}

{stage === "ready" && (
  <div className={styles.calibrationBox}>
    <p>
      {language === "en"
        ? "🛠 Before the test starts, make sure you can hear this tone clearly:"
        : "🛠 Πριν ξεκινήσει το τεστ, βεβαιωθείτε ότι ακούτε καθαρά αυτόν τον ήχο:"}
    </p>
    <audio autoPlay controls>
      <source src="/sounds/calibration-1000hz.mp3" type="audio/mpeg" />
      {language === "en"
        ? "Your browser does not support the audio element."
        : "Ο browser σας δεν υποστηρίζει το στοιχείο ήχου."}
    </audio>
    <p>
      {language === "en"
        ? "If you can't hear the tone well, please increase your device volume."
        : "Αν δεν ακούτε καλά τον ήχο, αυξήστε την ένταση της συσκευής σας."}
    </p>
  </div>
)}

        {stage === "ready" && (
          <p className={styles.paragraph}>
            {language === "en"
              ? `Test starts in ${countdown}...`
              : `Το τεστ ξεκινά σε ${countdown}...`}
          </p>
        )}

        {stage === "start" && (
          <button className={styles.startButton} onClick={handleStartTest}>
            {language === "en" ? "Start Test" : "Ξεκίνα Τεστ"}
          </button>
        )}

        {stage === "testing" && (
          <>
            <p className={styles.paragraph}>
              {language === "en"
                ? "Tap the ear when you stop hearing the tone"
                : "Πάτα το αυτί όταν σταματήσεις να ακούς"}
            </p>
            <EarButton
              stage={stage}
              setStage={setStage}
              setLowFreq={setLowFreq}
              setHighFreq={setHighFreq}
              language={language}
            />
          </>
        )}

        {stage === "done" && (
          <ResultDisplay
            lowFreq={lowFreq}
            highFreq={highFreq}
            language={language}
            onRestart={restartTest}
          />
        )}

        {showDisclaimer && (
          <DisclaimerModal onClose={() => setShowDisclaimer(false)} />
        )}
      </main>
    </>
  );
}
