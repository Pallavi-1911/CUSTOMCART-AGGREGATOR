import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FurnitureSearch from './pages/FurnitureSearch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
          <Route path='/' element={<Home/>} />
          <Route path='/FurnitureSearch' element={<FurnitureSearch/>} />
 
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
