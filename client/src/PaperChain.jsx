import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Ring({ color, position, rotation, onClick, isSelected }) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={onClick}
      scale={isSelected ? 1.3 : 1}
    >
      <torusGeometry args={[1, 0.05, 16, 100]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
    </mesh>
  );
}

const PaperChain = ({ chains, selectedIndex, setSelectedIndex }) => {
  const colors = [
    'red', 'orange', 'yellow',
    'green', 'blue', 'purple',
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-screen overflow-x-scroll">
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <OrbitControls />

          {chains.map((ring, index) => {
            const color = colors[index % colors.length];
            const isSelected = index === selectedIndex;
            const position = [index * 1.5 - (chains.length * 0.75), 0, 0];

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
          {chains[selectedIndex].text}
        </div>
      )}
    </div>
  );
};

export default PaperChain;
