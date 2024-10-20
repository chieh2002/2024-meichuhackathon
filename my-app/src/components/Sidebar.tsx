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
        任務達人秀
      </button>
      <button
        className={currentBoard === 'life' ? 'active' : ''}
        onClick={() => handleSwitchBoard('life', '/lifeboard')} // 切換到生活雜談版
      >
        閃耀時刻秀場
      </button>
      <button
        className={currentBoard === 'life' ? 'active' : ''}
        onClick={() => handleSwitchBoard('life', '/lifeboard')} // 切換到生活雜談版
      >
        感謝暖心牆
      </button>
      <button
        className={currentBoard === 'life' ? 'active' : ''}
        onClick={() => handleSwitchBoard('life', '/lifeboard')} // 切換到生活雜談版
      >
        公司神助攻
      </button>
      <button
        className={currentBoard === 'life' ? 'active' : ''}
        onClick={() => handleSwitchBoard('life', '/lifeboard')} // 切換到生活雜談版
      >
        星座職場指南
      </button>
      <button
        className={currentBoard === 'life' ? 'active' : ''}
        onClick={() => handleSwitchBoard('life', '/lifeboard')} // 切換到生活雜談版
      >
        團隊目標旗幟
      </button>
      <button
        className={currentBoard === 'life' ? 'active' : ''}
        onClick={() => handleSwitchBoard('life', '/lifeboard')} // 切換到生活雜談版
      >
        能量補給站
      </button>
      <button
        className={currentBoard === 'life' ? 'active' : ''}
        onClick={() => handleSwitchBoard('life', '/lifeboard')} // 切換到生活雜談版
      >
        團建嗨翻天日記
      </button>
      <button
        className={currentBoard === 'life' ? 'active' : ''}
        onClick={() => handleSwitchBoard('life', '/lifeboard')} // 切換到生活雜談版
      >
        DEI行動隊報告
      </button>
      <button
        className={currentBoard === 'life' ? 'active' : ''}
        onClick={() => handleSwitchBoard('life', '/lifeboard')} // 切換到生活雜談版
      >
        愛情與職場平衡術
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
