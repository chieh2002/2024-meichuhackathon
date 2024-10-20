import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchSectionProps {
    boardType: string; // 接收版面類型
  }

const SearchSection: React.FC<SearchSectionProps> = ({ boardType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // 在這裡處理搜尋邏輯
    console.log('搜尋:', searchTerm);
  };
  const handleAddArticle = () => {
    navigate('/add-article', { state: { boardType: boardType } }); // 跳轉並傳遞狀態
  };
  console.log('broadtype: ',boardType)
  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="搜尋標題"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>搜尋</button>
      <button>篩選方式</button>
      <button onClick={handleAddArticle}>新增新討論</button>
    </div>
  );
};

export default SearchSection;
