import './App.css';
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar';
import Landing from './components/Landing/Landing';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Filters from './components/Filter/Filter';

function App() {
  const location = useLocation();

  return (
    <div className='App'>
      {location.pathname !== '/' ? <NavBar/> : null}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Cards />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/form' element={<Form />} />
        <Route path='/test' element={<Filters />} />
      </Routes>
    </div>
  )
}

export default App
