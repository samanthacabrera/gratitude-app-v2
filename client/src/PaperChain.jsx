import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Ring({ color, position, rotation, onClick, isSelected }) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={onClick}
      scale={isSelected ? 1.7 : 1.5}  
    >
      <torusGeometry args={[0.8, 0.05, 16, 100]} /> 
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
    </mesh>
  );
}

const PaperChain = ({ chains, selectedIndex, setSelectedIndex }) => {
  const colors = [
    'red', 'orange', 'yellow',
    'green', 'blue', 'purple',
  ];

  const hardcodedChains = [
    { text: 'First Gratitude', id: 1 },
    { text: 'Second Gratitude', id: 2 },
    { text: 'Third Gratitude', id: 3 },
    { text: 'Fourth Gratitude', id: 4 },
    { text: 'Fifth Gratitude', id: 5 },
    { text: 'Sixth Gratitude', id: 6 },
  ];

  return (
    <div className="flex flex-col items-center">
      
      <div className="w-full h-screen overflow-x-scroll flex items-center justify-center">
        <Canvas 
          camera={{ position: [0, 0, 3], fov: 80 }} 
          style={{ width: '100%', height: '100%' }}  
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <OrbitControls />

          {hardcodedChains.map((ring, index) => {
            const color = colors[index % colors.length];
            const isSelected = index === selectedIndex;
            const position = [index * 1.2 - (hardcodedChains.length * 0.6), 0, -1];

            const rotation = [0, 0, index % 2 === 0 ? 0 : Math.PI / 2];

            return (
              <Ring
                key={ring.id}
                color={color}
                position={position}
                rotation={rotation}
                onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
                isSelected={isSelected}
              />
            );
          })}
        </Canvas>
      </div>

      {selectedIndex !== null && (
        <div className="absolute bottom-10 text-lg bg-white/80 px-4 py-2 rounded shadow">
          {hardcodedChains[selectedIndex].text}
        </div>
      )}
    </div>
  );
};

export default PaperChain;
