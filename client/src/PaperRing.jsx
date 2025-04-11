import React from 'react';

const PaperRing = ({ color = "red", text = "Gratitude", size = "16", onClick }) => {
  const sizeMap = {
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem",
  };

  const actualSize = sizeMap[size] || "4rem";

  return (
    <div
      onClick={onClick}
      className="relative m-4 cursor-pointer transition-transform duration-300"
      style={{
        width: actualSize,
        height: actualSize,
        borderRadius: '50%',
        boxShadow: `
          inset 0 0 10px rgba(0,0,0,0.2),
          0 4px 6px rgba(0,0,0,0.1)
        `,
        overflow: 'hidden',
        backgroundColor: color,
      }}
    >
      {/* Inner cutout */}
      <div
        className="absolute"
        style={{
          top: '25%',
          left: '25%',
          width: '50%',
          height: '50%',
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.15)',
        }}
      ></div>
    </div>
  );
};

export default PaperRing;
