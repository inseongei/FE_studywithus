/* eslint-disable */
import './App.css';
import Main from './pages/Main'
import Login from './pages/Login'
import ChatServer from './pages/ChatServer'
import ProjectDetail from './pages/Project/ProjectDetail';
import ProjectWrite from './pages/Project/ProjectWrite';
import ProjectInsert from './pages/Project/ProjectInsert'
import { Routes, Route } from 'react-router-dom'
import ProjectMain from './pages//Project/ProjectMain';
import Schedule from './pages/Todo/Schedule'
import Portfolio from './pages/Portfolio'
import UserMain from './pages/UserMain'
import Loading from './pages/Loading'
import Signup from './pages/Signup'
import Meeting from './pages/Meeting';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/Loading" element={<Loading/>} />
      <Route path="/ChatServer" element={<ChatServer/>} />
      <Route path="/UserMain" element={<UserMain/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/ProjectMain" element={<ProjectMain/>} />
      <Route path="/ProjectDetail/:projectId" element={<ProjectDetail/>} />
      <Route path="/ProjectInsert/:projectId" element={<ProjectInsert/>} />
      <Route path="/ProjectWrite" element={<ProjectWrite/>} />
      <Route path="/Portfolio" element={<Portfolio/>} />
      <Route path="/Schedule" element={<Schedule/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Meeting/:roomId" element={<Meeting/>} />
      </Routes>
    </div>
  );
}

export default App;
