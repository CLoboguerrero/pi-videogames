import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cards from './components/Cards/Cards';

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Cards />} />
      </Routes>
    </div>
  )
}

export default App
