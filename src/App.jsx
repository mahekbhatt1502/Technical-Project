import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Jeans from './components/Jeans';
import Shoes from './components/Shoes';
import TShirt from './components/Tshirt'; 
import Smartphone from './components/smartphone';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/jeans" element={<Jeans />} />
        <Route path="/category/shoes" element={<Shoes />} />
        <Route path="/category/t-shirt" element={<TShirt />} /> 
        <Route path="/category/smartphone" element={<Smartphone />} /> 
      </Routes>
    </Router>
  );
}
export default App;