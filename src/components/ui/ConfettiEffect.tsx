'use client';
import React, { useEffect, useState } from 'react';

const COLORS = ['#F8C8DC', '#C9A9C7', '#B7C9A8', '#D4876C', '#E8B4B8', '#C5B3D4', '#F5C9A8', '#A8C8E8'];

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
  rotation: number;
}

export default function ConfettiEffect({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);
      const timer = setTimeout(() => setPieces([]), 3500);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (pieces.length === 0) return null;

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </>
  );
}
