import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputDate from './components/InputDate';
import Crawled from './components/Crawled';
import axios from 'axios';

function App () {
  useEffect(() => {
    axios.get('/')
      .then(res => console.log(res))
      .catch()
  })
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/input" element={<InputDate />} />
          <Route path="/crawled" element={<Crawled />} />
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
