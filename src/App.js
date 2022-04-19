import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import InputDate from './component/InputDate';
import Crawled from './component/Crawled';
import Selected from './component/Selected';
import Header from './component/Header';
import Home from './component/Home';
import Read from './component/Read';
import Store from './component/Store';

function App () {

  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/input" element={<InputDate />} />
          <Route path="/crawled" element={<Crawled />} />
          <Route path="/selected" element={<Selected />} />
          <Route path="/read" element={<Read />} />
          <Route path="/store" element={<Store />} />
          <Route path='/privacy-policy' element={() => {
            window.location.href = 'https://example.com/1234';
            return null;
          }} />
        </Routes>
      </div>
    </HashRouter >
  );
}

export default App;
