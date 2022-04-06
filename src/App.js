import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputDate from './components/InputDate';
import Crawled from './components/Crawled';

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/input" element={<InputDate />} />
          <Route path="/crawled" element={<Crawled />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
