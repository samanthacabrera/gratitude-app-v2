import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const PaperRing = ({ color, onClick, isSelected }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer group transition-all duration-500 ease-in-out
                  flex items-center justify-center rounded-full
                  w-32 h-32 ${isSelected ? 'shadow-xl' : 'shadow-md hover:shadow-lg'}
                  transform ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
      style={{ 
        background: `linear-gradient(135deg, ${color}88, ${color})`,
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor: `${color}55`,
      }}
    >
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
           style={{ background: `radial-gradient(circle at 30% 30%, ${color}00, ${color}44)` }} />
      
      <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
      </div>
    </div>
  );
};

const PaperChain = () => {
  const [chains, setChains] = useState([]);
  const [newText, setNewText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const colors = [
    '#FF6B6B', // coral
    '#4ECDC4', // teal
    '#FFD166', // yellow
    '#06D6A0', // mint
    '#118AB2', // blue
    '#073B4C', // dark blue
    '#F72585', // magenta
    '#7209B7', // purple
    '#3A0CA3', // indigo
  ];
  
  const addChain = () => {
    if (!newText.trim()) return;
    
    setIsAnimating(true);
    setChains([...chains, { text: newText, id: Date.now() }]);
    setNewText("");
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleRingClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addChain();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 min-h-full relative text-white">
      
      <div className="my-4 mx-auto w-full max-w-sm ">
        <div className="flex items-center transition-all duration-200 ">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Add gratitude..."
            className="w-full py-3 px-4 bg-transparent placeholder-white border-b outline-none"
          />
          
          <button
            onClick={addChain}
            disabled={!newText.trim()}
            aria-label="Add to chain"
            className="mr-1 p-2 rounded-full transition-colors duration-200 ">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Paper chain */}
      <div className={`flex justify-center items-center transition-all duration-300 mb-24 ${isAnimating ? 'scale-105' : ''}`}>
        {chains.length === 0 ? (
          <></>
        ) : (
          chains.map((ring, index) => {
            const color = colors[index % colors.length];
            const isSelected = index === selectedIndex;
            return (
              <div
                key={ring.id}
                className={`-ml-8 first:ml-0 transition-all duration-500 ease-in-out ${
                  isSelected ? 'z-50 translate-y-2' : 'hover:z-30'
                }`}
                style={{ zIndex: isSelected ? 50 : chains.length - index }}
              >
                <PaperRing
                  color={color}
                  text={ring.text}
                  onClick={() => handleRingClick(index)}
                  isSelected={isSelected}
                />
              </div>
            );
          })
        )}
      </div>
      {selectedIndex !== null && (
          <p className="mt-4 text-xl text-white">
            {chains[selectedIndex].text}
          </p>
      )}
    </div>
  );
};

export default PaperChain;