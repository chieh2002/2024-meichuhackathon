import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, matchPath } from 'react-router-dom';
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

  // 用來判斷目前的路徑
  const location = useLocation();

  // 定義不想要 Sidebar 的路徑
  const noSidebarRoutes = ['/taskboard', '/task/:taskId'];

  // 檢查當前路徑是否是 "/task/:taskId" 這樣的動態路徑
  const isTaskDetailRoute = matchPath('/task/:taskId', location.pathname);

  // 判斷是否顯示 Sidebar
  const showSidebar = !noSidebarRoutes.includes(location.pathname) && !isTaskDetailRoute;

  return (
    <div className="app-container">
      {/* 如果路由不在 `noSidebarRoutes` 裡面就顯示 Sidebar */}
      {showSidebar && <Sidebar currentBoard={currentBoard} switchBoard={switchBoard} />}
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/techboard" element={<TechBoardPage />} />
          <Route path="/lifeboard" element={<LifeBoardPage />} />
          <Route path="/add-article" element={<AddArticle />} />
          <Route path="/question/:id" element={<QuestionDetail />} />
          <Route path="/taskboard" element={<TaskBoardPage />} />
          <Route path="/task/:taskId" element={<TaskDetailPage />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
