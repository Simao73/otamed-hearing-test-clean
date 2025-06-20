import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  stage: "start" | "done";
  setStage: (stage: "start" | "done") => void;
  setLowFreq: (freq: number) => void;
  setHighFreq: (freq: number) => void;
  language: "en" | "gr";
}

export const EarButton: React.FC<Props> = ({
  stage,
  setStage,
  setLowFreq,
  setHighFreq,
  language,
}) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const [startFreq] = useState(200); // Hz
  const [endFreq] = useState(20000); // Hz
  const duration = 20; // seconds

  const handleClick = () => {
    if (!playing) {
      // 1st click → start tone
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(endFreq, audioCtx.currentTime + duration);

      oscillator.connect(audioCtx.destination);
      oscillator.start();

      audioRef.current = audioCtx;
      oscillatorRef.current = oscillator;
      startTimeRef.current = audioCtx.currentTime;

      setLowFreq(startFreq);
      setPlaying(true);
    } else {
      // 2nd click → stop + record
      const audioCtx = audioRef.current;
      const oscillator = oscillatorRef.current;
      const elapsed = (audioCtx?.currentTime || 0) - startTimeRef.current;
      const estimatedFreq = Math.round(
        startFreq + ((endFreq - startFreq) * (elapsed / duration))
      );

      setHighFreq(estimatedFreq);
      oscillator?.stop();
      audioCtx?.close();

      setPlaying(false);
      setStage("done");
    }
  };

  const labels = {
    en: ["Tap the ear when you hear", "Tap again when you can't hear"],
    gr: ["Πάτα το αυτί όταν αρχίσεις να ακούς", "Ξαναπάτα όταν σταματήσεις να ακούς"],
  };

  return (
  <div
    onClick={handleClick}
    style={{
      cursor: "pointer",
      userSelect: "none",
      display: "inline-block",
      animation: playing ? "pulse 1s infinite" : "none"
    }}
  >
    <Image
      src="/images/ear.png"
      alt="Ear"
      width={150}
      height={150}
    />
    <style jsx>{`
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }
    `}</style>
  </div>
);

