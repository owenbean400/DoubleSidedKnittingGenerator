import React from 'react';
import Navbar from './theStuff/navbar/navbar';
import Toolbar from './theStuff/toolbar/toolbar';
import Canvas from './theStuff/canvas/canvas';

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <Toolbar />
      <Canvas />
    </div>
  );
}

