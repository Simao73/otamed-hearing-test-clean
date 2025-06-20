import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { EarButton } from "../components/EarButton";
import { ResultDisplay } from "../components/ResultDisplay";
import { LanguageSelector } from "../components/LanguageSelector";
import { translations } from "../utils/translations";

export default function Home() {
  const [lowFreq, setLowFreq] = useState<number | null>(null);
  const [highFreq, setHighFreq] = useState<number | null>(null);
  const [language, setLanguage] = useState<"en" | "gr">("gr");
  const [testComplete, setTestComplete] = useState(false);

  const t = translations[language];

  return (
    <>
      <Head>
        <title>Otamed Ear Age Test</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.logo}>
          <Image src="/logo/otamed-logo.png" alt="Otamed" width={150} height={50} />
        </div>

        <LanguageSelector language={language} setLanguage={setLanguage} />

        <h1>{t.title}</h1>
        <p>
          {testComplete
            ? ""
            : lowFreq === null
            ? t.instructionStart
            : t.instructionStop}
        </p>

        <EarButton
          onFrequenciesCaptured={(low, high) => {
            setLowFreq(low);
            setHighFreq(high);
            setTestComplete(true);
          }}
        />

        {testComplete && (
          <ResultDisplay
            lowFreq={lowFreq}
            highFreq={highFreq}
            language={language}
          />
        )}
      </main>
    </>
  );
}
