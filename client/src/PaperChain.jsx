import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function BentPaperRing({ color, position, rotation, onClick, isSelected }) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={isSelected ? 1.7 : 1.5}
      onClick={onClick}
    >
      <ringGeometry args={[0.5, 0.8, 100]} /> {/* Inner radius, outer radius, segments */}
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.4} 
        side={THREE.DoubleSide} 
      />
    </mesh>
  );
}

const PaperChain = ({ chains, selectedIndex, setSelectedIndex }) => {
  const containerRef = useRef(null);
  const colors = [
    '#FF6EC7', 
    '#FF3F00',
    '#05B2DC',
    '#BAFF70',
    '#FF7247',
    '#FCFF5C',
  ];

  const ringsToRender = chains.length > 0 ? chains : [
  ];

  const canvasWidth = Math.max(100, ringsToRender.length * 500);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.width = `${canvasWidth}px`;
    }
  }, [ringsToRender.length, canvasWidth]);

  return (
    <div className="flex flex-col items-center w-full">
      <div
        ref={containerRef}
        className="h-screen overflow-x-auto flex items-center justify-center"
        style={{ minWidth: '100%', width: `${canvasWidth}px` }}
      >
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            zoom: Math.max(0.6, 1.5 - ringsToRender.length * 0.05),
          }}
          className="h-screen"
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <OrbitControls enablePan={false} enableZoom={false} />

          {ringsToRender.map((ring, index) => {
            const color = colors[index % colors.length];
            const isSelected = index === selectedIndex;

            const spacing = 1.4;
            const centerOffset = ((ringsToRender.length - 1) * spacing) / 2;
            const position = [index * spacing - centerOffset, 0, 0];

            const rotation = index % 2 === 0
              ? [ 0,  0,  Math.PI / 2]
              : [Math.PI / 3, 0, 0];

            return (
              <BentPaperRing
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

      {selectedIndex !== null && ringsToRender[selectedIndex] && (
        <div className="absolute bottom-10 text-2xl w-full text-center">
          {ringsToRender[selectedIndex].text}
        </div>
      )}
    </div>
  );
};

export default PaperChain;
