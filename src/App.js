import './App.css';
import Main from './pages/Main'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/Login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
