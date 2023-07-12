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
import Loading from './pages/Loading'


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/Loading" element={<Loading/>} />
      <Route path="/UserMain" element={<UserMain/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/ProjectMain" element={<ProjectMain/>} />
      <Route path="/ProjectWrite" element={<ProjectWrite/>} />
      <Route path="/Portfolio" element={<Portfolio/>} />
      <Route path="/Schedule" element={<Schedule/>} />
      </Routes>
    </div>
  );
}

export default App;
