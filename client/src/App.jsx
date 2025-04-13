import React, { useEffect, useRef } from 'react';
import PaperChain from './PaperChain';

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const render = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#CFF5E7');
      gradient.addColorStop(0.5, '#DCC6E0');
      gradient.addColorStop(1, '#CFF5E7');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      
      // Draw waves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x < canvas.width; x += 10) {
          const y = Math.sin(x * 0.01 + time + i) * 50 + 
                   Math.sin(x * 0.02 - time * 0.5 + i) * 30 +
                   canvas.height / 2 + i * 40;
          
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        const waveGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        waveGradient.addColorStop(0, `rgba(${100 + i * 30}, ${50 + i * 40}, ${200 - i * 20}, 0.1)`);
        waveGradient.addColorStop(1, `rgba(${150 + i * 20}, ${100 + i * 30}, ${220 - i * 20}, 0.05)`);
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
      }
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">Gratitude Chain</h1>
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-xl">
          <PaperChain />
        </div>
      </div>
    </div>
  );
};

export default App;