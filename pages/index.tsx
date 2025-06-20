import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { EarButton } from "../components/EarButton";
import { ResultDisplay } from "../components/ResultDisplay";
import { LanguageSelector } from "../components/LanguageSelector";
import { translations } from "../utils/translations";

export default function Home() {
  const [stage, setStage] = useState<"start" | "ready" | "testing" | "done">("ready");
  const [lowFreq, setLowFreq] = useState<number | null>(null);
  const [highFreq, setHighFreq] = useState<number | null>(null);
  const [language, setLanguage] = useState<"en" | "gr">("gr");
  const [countdown, setCountdown] = useState(3);

  const t = translations[language];

  React.useEffect(() => {
    if (stage === "ready" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && stage === "ready") {
      setStage("testing");
    }
  }, [countdown, stage]);

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

        {stage === "ready" && <p>{language === "en" ? `Test starts in ${countdown}...` : `Το τεστ ξεκινά σε ${countdown}...`}</p>}
        {stage === "testing" && <p>{language === "en" ? "Tap the ear when you stop hearing the tone" : "Πάτα το αυτί όταν σταματήσεις να ακούς"}</p>}
        {stage === "done" && <p>{language === "en" ? "Your results:" : "Αποτελέσματα:"}</p>}

        {stage !== "done" && (
          <EarButton
            stage={stage}
            setStage={setStage}
            setLowFreq={setLowFreq}
            setHighFreq={setHighFreq}
            language={language}
          />
        )}

        {stage === "done" && (
          <ResultDisplay lowFreq={lowFreq} highFreq={highFreq} language={language} />
        )}
      </main>
    </>
  );
}
