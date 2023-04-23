import './style.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Books from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';
import Registration from './pages/Registration';
import Login from './pages/Login';
import About from './pages/About';


function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path='/about' element={<About />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
