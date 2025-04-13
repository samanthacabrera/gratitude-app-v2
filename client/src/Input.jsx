import React from 'react';
import { ArrowRight } from 'lucide-react';

const Input = ({ newText, setNewText, addChain }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addChain();
  };

  return (
    <div className="w-full max-w-2xl flex gap-2 px-4 items-center justify-center">
      <input
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="ADD GRATITUDE..."
        className="flex-1 py-4 px-6 text-2xl font-bold placeholder-white text-white bg-transparent border-4 border-solid border-white outline-none focus:border-white"
      />
      <button
        onClick={addChain}
        disabled={!newText.trim()}
        className="p-4 bg-transparent text-white font-bold text-2xl uppercase border-4 border-solid border-white hover:bg-white hover:text-purple-900 focus:border-white transform transition duration-200"
      >
        <ArrowRight size={30} />
      </button>
    </div>
  );
};

export default Input;
