import React from 'react';
import { ArrowRight } from 'lucide-react';

const Input = ({ newText, setNewText, addChain }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addChain();
  };

  return (
    <div>
    <div className="w-full max-w-xl flex gap-2 px-4 ml-4 items-center justify-center">
      <input
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="I am grateful for..."
        className="flex-1 py-4 px-2 text-2xl font-bold placeholder-white text-white bg-transparent border-b-4 border-white outline-none focus:border-white"
      />
      <button
        onClick={addChain}
        disabled={!newText.trim()}
        className="text-white hover:translate-x-1 transform transition-all duration-200"
      >
        <ArrowRight size={30} />
      </button>
    </div>
    <p className="ml-8 mt-2 text-xl">( press 'Enter' to add yours to the chain )</p>
    </div>
  );
};

export default Input;
