"use client";

import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";

const EggTimer = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [modalContentVisible, setModalContentVisible] = useState<boolean>(false);
  const [timerVisible, setTimerVisible] = useState<boolean>(false);

  const alarmSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      alarmSound.current = new Audio("/assets/mp3/victoryfanafare.mp3");
      alarmSound.current.volume = 0.05;
    }
  }, []);

  const startTimer = (minutes: number) => {
    if (timer) clearInterval(timer);
    setTimeLeft(minutes * 60);
    setTimerVisible(true);

    const newTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(newTimer);
          setTimerVisible(false);
          setShowModal(true);
          setShowConfetti(true);
          alarmSound.current?.play();
          setTimeout(() => setModalContentVisible(true), 50);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimer(newTimer);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
      if (alarmSound.current) {
        alarmSound.current.pause();
        alarmSound.current.currentTime = 0;
      }
    };
  }, [timer]);

  useEffect(() => {
    if (!showModal) {
      setModalContentVisible(false);
    }
  }, [showModal]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimerVisible(false);
    }
  }, [timeLeft]);

  const stopSound = () => {
    if (alarmSound.current) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-pink-100 rounded-lg shadow-lg font-pixel pixelated-border pixelated-bg">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} onConfettiComplete={() => setShowConfetti(false)} />}

      {showModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-300 ease-in-out pixelated-border pixelated-bg ${showModal ? "bg-opacity-50" : "bg-opacity-0"}`}
          onClick={() => {
            setShowModal(false);
            stopSound();
          }}
        >
          <div
            className={`bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${modalContentVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-pink-700 mb-4">Your egg is ready!</h2>

            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" className="mb-4">
              <g transform="translate(20,20)">
                <rect x="30" y="0" width="100" height="10" fill="#FFF5E6" />
                <rect x="20" y="10" width="120" height="10" fill="#FFF5E6" />
                <rect x="10" y="20" width="140" height="100" fill="#FFF5E6" />
                <rect x="20" y="120" width="120" height="10" fill="#FFF5E6" />
                <rect x="30" y="130" width="100" height="10" fill="#FFF5E6" />

                <rect x="50" y="50" width="60" height="60" fill="#FFE066" />
                <rect x="40" y="60" width="10" height="40" fill="#FFE066" />
                <rect x="110" y="60" width="10" height="40" fill="#FFE066" />
                <rect x="50" y="110" width="60" height="10" fill="#FFE066" />

                <rect x="60" y="70" width="20" height="10" fill="#000000" />
                <rect x="100" y="70" width="20" height="10" fill="#000000" />

                <rect x="70" y="90" width="40" height="10" fill="#000000" />
                <rect x="60" y="100" width="10" height="10" fill="#000000" />
                <rect x="110" y="100" width="10" height="10" fill="#000000" />

                <rect x="40" y="80" width="10" height="10" fill="#FFB3BA" />
                <rect x="130" y="80" width="10" height="10" fill="#FFB3BA" />

                <rect x="20" y="90" width="20" height="10" fill="#FFE066" />
                <rect x="140" y="90" width="20" height="10" fill="#FFE066" />
              </g>
            </svg>

            <p className="text-lg text-pink-600 mb-6">Enjoy your perfectly boiled egg!</p>
            <button
              onClick={() => {
                setModalContentVisible(false);
                setTimeout(() => setShowModal(false), 300);
                stopSound();
              }}
              className="btn btn-primary bg-pink-500 border-pink-500 hover:bg-pink-600 hover:border-pink-600 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-pink-700 mb-4">🥚 Egg Timer 🥚</h1>
      <p className="text-lg text-pink-600 mb-6">Choose your egg type:</p>
      <div className="flex justify-between gap-4">
        <div onClick={() => startTimer(0.1)} className="flex-1 flex items-center justify-center border rounded-xl cursor-pointer px-3 py-2 w-auto bg-pink-500 hover:bg-pink-600 pixelated-border">
          <div className="flex flex-col items-center justify-center">
            <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(10,10)">
                <rect x="20" y="0" width="60" height="10" fill="#F0F0F0" />
                <rect x="10" y="10" width="80" height="10" fill="#F0F0F0" />
                <rect x="0" y="20" width="100" height="60" fill="#F0F0F0" />
                <rect x="10" y="80" width="80" height="10" fill="#F0F0F0" />
                <rect x="20" y="90" width="60" height="10" fill="#F0F0F0" />

                <rect x="30" y="30" width="40" height="40" fill="#FFD700" />
                <rect x="40" y="70" width="20" height="10" fill="#FFD700" />
              </g>
            </svg>

            <span className="text-sm text-center text-white">Classic Boiled</span>
            <span className="text-sm text-center text-white">(10 mins)</span>
          </div>
        </div>

        <div onClick={() => startTimer(12)} className="flex-1 flex items-center justify-center border rounded-xl cursor-pointer px-3 py-2 w-auto  bg-purple-500  hover:bg-purple-600 pixelated-border">
          <div className="flex flex-col items-center justify-center">
            <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(10,10)">
                <rect x="20" y="0" width="60" height="10" fill="#F0F0F0" />
                <rect x="10" y="10" width="80" height="10" fill="#F0F0F0" />
                <rect x="0" y="20" width="100" height="60" fill="#F0F0F0" />
                <rect x="10" y="80" width="80" height="10" fill="#F0F0F0" />
                <rect x="20" y="90" width="60" height="10" fill="#F0F0F0" />

                <rect x="30" y="30" width="40" height="40" fill="#FFA500" />
              </g>
            </svg>

            <span className="text-sm text-center text-white">Hard Boiled</span>
            <span className="text-sm text-center text-white">(12 mins)</span>
          </div>
        </div>
      </div>

      <div className={`mt-6 overflow-hidden transition-all duration-300 ease-in-out ${timerVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-2xl font-bold text-pink-700">Time left: {formatTime(timeLeft)}</p>
      </div>
    </div>
  );
};

export default EggTimer;
