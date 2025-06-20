import React, { useState, useEffect, useRef } from "react";

interface EarButtonProps {
  onFrequenciesCaptured: (lowFreq: number, highFreq: number) => void;
}

export const EarButton: React.FC<EarButtonProps> = ({ onFrequenciesCaptured }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(1000);
  const [stage, setStage] = useState<"start" | "min" | "max" | "done">("start");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const lowFreqRef = useRef<number | null>(null);
  const highFreqRef = useRef<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setFrequency((prev) => Math.min(prev + 250, 20000));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.value = frequency;
    }
  }, [frequency]);

  const startTone = () => {
    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtxRef.current.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(audioCtxRef.current.destination);
    oscillator.start();
    oscillatorRef.current = oscillator;
    setIsPlaying(true);
  };

  const stopTone = () => {
    oscillatorRef.current?.stop();
    oscillatorRef.current?.disconnect();
    oscillatorRef.current = null;
    audioCtxRef.current?.close();
    setIsPlaying(false);
  };

  const handleClick = () => {
    if (stage === "start") {
      setFrequency(1000);
      startTone();
      setStage("min");
    } else if (stage === "min") {
      stopTone();
      lowFreqRef.current = frequency;
      setFrequency(12000);
      startTone();
      setStage("max");
    } else if (stage === "max") {
      stopTone();
      highFreqRef.current = frequency;
      setStage("done");

      if (lowFreqRef.current && highFreqRef.current) {
        onFrequenciesCaptured(lowFreqRef.current, highFreqRef.current);
      }
    }
  };

  const pulseStyle = isPlaying
    ? {
        animation: "pulse 1s infinite",
      }
    : {};

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        fontSize: "80px",
        userSelect: "none",
        ...pulseStyle,
      }}
    >
      👂
      <style>
        {`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}
      </style>
    </div>
  );
};