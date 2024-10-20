import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuestionDetail.css'; // 確保路徑正確

interface InputFormProps {
  questionID: string; // 從父組件傳入的 questionID
  broadType: string;  // 從父組件傳入的 broadType
  author: string;     // 從父組件傳入的 author
}

const InputForm: React.FC<InputFormProps> = ({ questionID, broadType, author }) => {
  const [content, setContent] = useState<string>(''); // 用於追踪輸入框的內容
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // 用於導航

  // 處理表單提交
  const handleSubmit = async () => {
    if (!content) {
      alert('請輸入內容');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8888/api/v1/addAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          author: "character_name",
          hashtag: [],  // 根據需求可以動態填寫
          broadType: broadType,
          questionID: questionID,
          likeNum: [],  // 根據實際需求修改
        }),
      });

      if (!response.ok) {
        throw new Error('API 請求失敗');
      }

      const result = await response.json();
      console.log('回應結果:', result);
      setContent('');  // 成功後清空輸入框

      // 提交成功後，重新導向到當前頁面
      navigate(0); // 使用 `0` 來重新加載當前頁面

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-form">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)} // 追踪輸入框變化
        placeholder="輸入您的回答..."
        className="input-box"
      />
      <button onClick={handleSubmit} disabled={loading} className="submit-button">
        {loading ? '提交中...' : '傳送'}
      </button>
      {error && <p className="error-message">發生錯誤: {error}</p>}
    </div>
  );
};

export default InputForm;
