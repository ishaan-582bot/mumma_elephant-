'use client';
import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}

export default function EmptyState({ icon, title, subtitle, action, secondaryAction }: EmptyStateProps) {
  return (
    <div className="fade-in-up" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      gap: 16,
    }}>
      <div style={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--blush-light), var(--cream))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 48,
        boxShadow: 'var(--shadow-glow-blush)',
        marginBottom: 8,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: '1.15rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.4,
        maxWidth: 280,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        maxWidth: 260,
        lineHeight: 1.5,
      }}>
        {subtitle}
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {action && (
          <button
            onClick={action.onClick}
            style={{
              background: 'linear-gradient(135deg, var(--blush), var(--blush-dark))',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '12px 28px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {action.label}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '2px solid var(--cream-dark)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 28px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--blush)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--cream-dark)'; }}
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}
