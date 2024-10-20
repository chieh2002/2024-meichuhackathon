import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import { addQuestion } from '../../services/api'; // 引入 API 函數
import '../styles/AddArticleForm.css'; // 確保引入 CSS

interface AddArticleFormProps {
  boardType: string; // 接收 boardType 作為 props
}

const AddArticleForm: React.FC<AddArticleFormProps> = ({ boardType }) => {
  const [content, setContent] = useState<string>('');
  const [hashtags, setHashtags] = useState<string>('');
  const navigate = useNavigate(); // 使用 useNavigate 來導航

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle = {
      content,
      author: "username", // 根據需求替換實際的作者名稱
      hashtag: hashtags.split(',').map(tag => tag.trim()),
      broadType: boardType,
      questionID: '',
      likeNum: [],
    };

    await addQuestion(newArticle);

    // 清空表單
    setContent('');
    setHashtags('');

    // 成功提交後導航回對應的 boardType 頁面
    navigate(`/${boardType.toLowerCase()}board`);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        placeholder="文章內容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="標籤 (以逗號分隔)"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />
      <button type="submit">提交文章</button>
    </form>
  );
};

export default AddArticleForm;
