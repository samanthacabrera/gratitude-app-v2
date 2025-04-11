// App.js
import React from 'react';
import PaperChain from './PaperChain';

const App = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Gratitude Chain</h1>
      <PaperChain />
    </div>
  );
};

export default App;
