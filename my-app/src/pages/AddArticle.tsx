import React from 'react';
import { useLocation } from 'react-router-dom';
import AddArticleForm from '../components/AddArticleForm';

const AddArticle: React.FC = () => {
  const location = useLocation();

  // 獲取從導航狀態中傳遞的資料
  const { boardType } = location.state || {}; // 這裡使用安全訪問運算符

  return (
    <div>
      <h2>新增文章</h2>
      <p>來自版面: {boardType || '未提供'}</p> {/* 顯示來源 */}
      {/* 將 boardType 傳遞給 AddArticleForm */}
      <AddArticleForm boardType={boardType} />
    </div>
  );
};

export default AddArticle;
