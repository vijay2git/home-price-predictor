import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function LiveWallpaper() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create a video element for streaming effect
    const video = document.createElement('canvas');
    const videoCtx = video.getContext('2d');
    video.width = 800;
    video.height = 600;

    // Animated gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#1e293b');
    gradient.addColorStop(1, '#0f172a');

    let time = 0;

    const animate = () => {
      time += 0.01;

      // Draw base gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add animated waves
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.1)';
      ctx.lineWidth = 2;

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 20) {
          const y = canvas.height / 2 + Math.sin((x + time * 50 + i * 500) * 0.01) * 50;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Add floating shapes with blur effect
      ctx.filter = 'blur(0.5px)';
      ctx.fillStyle = 'rgba(37, 99, 235, 0.08)';
      
      for (let i = 0; i < 3; i++) {
        const x = canvas.width / 2 + Math.sin(time + i) * 300;
        const y = canvas.height / 2 + Math.cos(time * 0.7 + i) * 200;
        const size = 100 + Math.sin(time * 0.5 + i) * 50;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add noise effect
      ctx.filter = 'none';
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 5;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }
      ctx.putImageData(imageData, 0, 0);

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
    </>
  );
}
