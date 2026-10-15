
'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.replace("https://the-last-dataset-jqpr.vercel.app/");
  }, []);

  return (
    <div style={{ background: '#000', color: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <p>CHALLENGE COMPLETED. Redirecting to <a href="https://the-last-dataset-jqpr.vercel.app/" style={{ color: '#00f0ff' }}>The Last Dataset</a>...</p>
    </div>
  );
}
