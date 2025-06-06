import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Consulta from './pages/Consulta';
import NotFound from './pages/NotFound';


function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/consulta" element={<Consulta />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      <Footer />
    </>
  );

}

export default App
