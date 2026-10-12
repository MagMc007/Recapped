import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(229,9,20,0.08) 0%, transparent 60%), var(--bg)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 420, zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
