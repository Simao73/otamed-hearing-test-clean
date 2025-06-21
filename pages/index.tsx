import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { EarButton } from "../components/EarButton";
import { ResultDisplay } from "../components/ResultDisplay";
import { LanguageSelector } from "../components/LanguageSelector";
import { translations } from "../utils/translations";

export default function Home() {
  const [stage, setStage] = useState<"ready" | "start" | "testing" | "done">("ready");
  const [lowFreq, setLowFreq] = useState<number | null>(null);
  const [highFreq, setHighFreq] = useState<number | null>(null);
  const [language, setLanguage] = useState<"en" | "gr">("gr");
  const [countdown, setCountdown] = useState(3);
  const restartTest = () => {
  setLowFreq(null);
  setHighFreq(null);
  setCountdown(3);
  setStage("ready");
};

  const t = translations[language];

  useEffect(() => {
    if (stage === "ready" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && stage === "ready") {
      setStage("start");
    }
  }, [countdown, stage]);

  const handleStartTest = () => {
    setStage("testing");
  };
  const restartTest = () => {
  setStage("ready");
  setLowFreq(null);
  setHighFreq(null);
  setCountdown(3);
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

        <h1>{t.title}</h1>

        {stage === "ready" && (
          <p>
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
            <p>
              {language === "en"
                ? "Tap the ear when you stop hearing the tone"
                : "Πάτα το αυτί όταν σταματήσεις να ακούς"}
            </p>
            <EarButton
              stage={stage}
              setStage={(s) => setStage(s)}
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
            onRestart={restartTest} //
          />
        )}
      </main>
    </>
  );
}
