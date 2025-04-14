import React, { useEffect, useRef, useState } from 'react';
import PaperChain from './PaperChain';
import Input from './Input'; 
import About from './About';


const App = () => {
  const canvasRef = useRef(null);
  const [chains, setChains] = useState([]);
  const [newText, setNewText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const addChain = () => {
    if (!newText.trim()) return;
    setChains([...chains, { text: newText, id: Date.now() }]);
    setNewText("");
  };

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
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#97C3C4');
      gradient.addColorStop(0.5, '#FEEFDD');
      gradient.addColorStop(1, '#50B2C0');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

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
    <div className="flex relative">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 min-w-[400vw] w-full h-full -z-10"
      />
      <div className="flex flex-col h-screen w-[70vw]">
        <h1 className="text-[15rem] text-white mx-4 mb-4 leading-tight">Gratitude Chain</h1>
        <Input 
          newText={newText} 
          setNewText={setNewText} 
          addChain={addChain}
        />
      </div>
      <About/>
      <PaperChain
        chains={chains}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <footer className="absolute bottom-4 left-8 text-2xl text-white hover:underline">Made by <a href="https://github.com/samanthacabrera" target="_blank">Sam Cabrera</a></footer>
      <div className="fixed bottom-4 right-8 text-2xl text-white">
        Total Rings: {chains.length} 
      </div>
    </div>
  );
};

export default App;
