// src/components/Confetti/Confetti.jsx
import React, { useState, useEffect } from "react";

const Confetti = ({ active }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) {
      const newParticles = [];
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: -10 - Math.random() * 40,
          size: 5 + Math.random() * 10,
          color: `hsl(${Math.random() * 360}, 80%, 60%)`,
          speed: 1 + Math.random() * 3,
        });
      }
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [active]);

  useEffect(() => {
    if (particles.length === 0) return;

    const animateConfetti = () => {
      setParticles((prevParticles) =>
        prevParticles
          .map((p) => ({
            ...p,
            y: p.y + p.speed,
            x: p.x + (Math.random() - 0.5),
          }))
          .filter((p) => p.y < 100)
      );
    };

    const interval = setInterval(animateConfetti, 50);
    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-lg"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
