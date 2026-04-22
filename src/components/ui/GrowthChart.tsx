'use client';
import React from 'react';
import { motion } from 'framer-motion';
import FieldLabel from './FieldLabel';

interface DataPoint {
  date: string;
  value: number;
}

interface GrowthChartProps {
  data: DataPoint[];
  color: string;
  unit: string;
  label: string;
}

export default function GrowthChart({ data, color, unit, label }: GrowthChartProps) {
  if (!data || data.length === 0) return null;

  const width = 300;
  const height = 120;
  const padding = 20;

  const minVal = Math.min(...data.map(d => d.value)) * 0.95;
  const maxVal = Math.max(...data.map(d => d.value)) * 1.05;
  const range = maxVal - minVal;

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * (width - padding * 2) + padding,
    y: height - ((d.value - minVal) / range) * (height - padding * 2) - padding,
  }));

  const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  
  // Percentile background lines (mocked for visual context)
  const pPathD = (offset: number) => 
    `M ${points.map((p, i) => `${p.x},${p.y + offset + Math.sin(i) * 5}`).join(' L ')}`;

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '16px', boxShadow: 'var(--shadow-resting)', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <FieldLabel>{label}</FieldLabel>
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: color }}>{data[data.length - 1].value} {unit}</span>
      </div>
      
      <div style={{ position: 'relative', height }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
          {/* Percentile Band (Light Shade) */}
          <motion.path
            d={pPathD(10)}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeOpacity="0.05"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Main Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="white"
              stroke={color}
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}
        </svg>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{data[0].date}</span>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Today</span>
      </div>
    </div>
  );
}
