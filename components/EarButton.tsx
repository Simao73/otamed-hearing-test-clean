import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  stage: "start" | "testing" | "done";
  setStage: (stage: "testing" | "done") => void;
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
  const [startFreq] = useState(200);
  const [endFreq] = useState(20000);
  const duration = 20;

  // autostart when stage is "start"
  useEffect(() => {
    if (stage === "start" && !playing) {
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
      setStage("testing");
    }
  }, [stage]);

  const handleClick = () => {
    if (!playing) return;

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
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: playing ? "pointer" : "default",
        userSelect: "none",
        display: "inline-block",
        animation: playing ? "pulse 1s infinite" : "none",
      }}
    >
      <Image src="/images/ear.png" alt="Ear" width={150} height={150} />
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
