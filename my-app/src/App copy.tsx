import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LifeBoardPage from './pages/LifeBoardPage';
import TechBoardPage from './pages/TechBoardPage';
import QuestionDetail from './pages/QuestionDetail';
import AddArticle from './pages/AddArticle';
import TaskBoardPage from './pages/TaskBoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import Sidebar from './components/Sidebar';
import './App.css'; // 新增樣式


const App: React.FC = () => {
  const [currentBoard, setCurrentBoard] = useState('tech');

  const switchBoard = (board: string) => {
    setCurrentBoard(board);
  };
  return (
    <Router>
      <div className="app-container">
        <Sidebar currentBoard={currentBoard} switchBoard={switchBoard} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/techboard" element={<TechBoardPage />} />
            <Route path="/lifeboard" element={<LifeBoardPage />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/question/:id" element={<QuestionDetail />} />
            <Route path="/taskboard" element={<TaskBoardPage />}/>
            <Route path="/task/:taskId" element={<TaskDetailPage />} />
          </Routes>
        </div>
      </div>
      
    </Router>

  );
};

export default App;
