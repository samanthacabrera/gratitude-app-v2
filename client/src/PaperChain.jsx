import React, { useState } from 'react';
import PaperRing from './PaperRing';

const PaperChain = () => {
  const [chains, setChains] = useState([]);
  const [newText, setNewText] = useState("");
  const [selectedText, setSelectedText] = useState("");

  const colors = [
    '#f87171', // red-400
    '#facc15', // yellow-400
    '#34d399', // green-400
    '#60a5fa', // blue-400
    '#a78bfa', // purple-400
    '#fb7185', // pink-400
    '#f97316', // orange-400
  ];

  const addChain = () => {
    if (!newText.trim()) return;
    setChains([...chains, { text: newText }]);
    setNewText("");
  };

  const handleRingClick = (text) => {
    setSelectedText(text);
  };

  return (
    <div className="flex flex-col items-center p-6 relative">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="What are you grateful for?"
          className="border p-2 rounded-md w-64"
        />
        <button
          onClick={addChain}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Ring
        </button>
      </div>

        <div className="flex justify-center items-center">
        {chains.map((ring, index) => {
            const color = colors[index % colors.length];
            return (
            <div
                key={index}
                className="-ml-12 first:ml-0 z-[1]"
                style={{ zIndex: chains.length - index }} 
            >
                <PaperRing
                color={color}
                text={ring.text}
                onClick={() => handleRingClick(ring.text)}
                />
            </div>
            );
        })}
        </div>


      {selectedText && (
        <div className="mt-12 bg-white border text-center shadow-md px-6 py-4 rounded-lg text-lg text-gray-800 z-50">
          {selectedText}
        </div>
      )}
    </div>
  );
};

export default PaperChain;
