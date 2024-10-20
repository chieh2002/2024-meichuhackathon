import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  currentBoard: string;
  switchBoard: (board: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentBoard, switchBoard }) => {
  const navigate = useNavigate(); // 使用 useNavigate 鉤子

  const handleSwitchBoard = (board: string, path: string) => {
    switchBoard(board); // 切換板區
    navigate(path); // 跳轉路由
  };

  return (
    <div className="sidebar">
      <button
        className={currentBoard === 'tech' ? 'active' : ''}
        onClick={() => handleSwitchBoard('tech', '/techboard')} // 切換到技術討論版
      >
        技術討論版
      </button>
      <button
        className={currentBoard === 'life' ? 'active' : ''}
        onClick={() => handleSwitchBoard('life', '/lifeboard')} // 切換到生活雜談版
      >
        生活雜談版
      </button>
    </div>
  );
};

export default Sidebar;
