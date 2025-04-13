import React from 'react';
import { ArrowRight } from 'lucide-react';

const Input = ({ newText, setNewText, addChain }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addChain();
  };

  return (
    <div className="w-full max-w-md flex gap-2 px-4">
      <input
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add gratitude..."
        className="flex-1 py-2 px-4 border rounded-md outline-none"
      />
      <button
        onClick={addChain}
        disabled={!newText.trim()}
        className="p-2 bg-blue-500 text-white rounded-full disabled:opacity-40"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default Input;
