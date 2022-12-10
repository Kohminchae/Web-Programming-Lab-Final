import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
