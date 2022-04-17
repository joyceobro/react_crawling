import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputDate from './components/InputDate';
import Crawled from './components/Crawled';
import Selected from './components/Selected';
import Header from './components/Header';
import Home from './components/Home';
import Read from './components/Read';

function App () {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/input" element={<InputDate />} />
          <Route path="/crawled" element={<Crawled />} />
          <Route path="/selected" element={<Selected />} />
          <Route path="/read" element={<Read />} />
          <Route path='/privacy-policy' element={() => {
            window.location.href = 'https://example.com/1234';
            return null;
          }} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
