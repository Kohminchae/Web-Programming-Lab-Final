import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import WordList from './WordList';
import Test from './Test';
import Score from './Score';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/test" element={<Test />} />
        <Route path="/wordlist" element={<WordList />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
