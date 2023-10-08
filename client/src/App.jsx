import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';

function App() {

  return (
    <div className='App'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
