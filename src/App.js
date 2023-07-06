/* eslint-disable */
import './App.css';
import Main from './pages/Main'
import Login from './pages/Login'
import ProjectDetail from './pages/ProjectDetail';
import ProjectWrite from './pages/ProjectWrite';
import { Routes, Route } from 'react-router-dom'
import ProjectMain from './pages/ProjectMain';
import Schedule from './pages/Schedule';
import Portfolio from './pages/Portfolio'
import PortfolioDetail from './pages/PortfolioDetail';
import PortfolioWrite from './pages/PortfolioWrite'
import UserMain from './pages/UserMain'


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/ProjectMain" element={<ProjectMain/>} />
      <Route path="/ProjectWrite" element={<ProjectWrite/>} />
      </Routes>
    </div>
  );
}

export default App;
