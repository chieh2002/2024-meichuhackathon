export interface Message {
    _id: string;
    messageId: string;
    content: string;
    author: string;
    createdAt: string;
    mesgType: string;
    questionID: string;
    likeNum: string[];
    hashtag: string[];
    broadType: string;
  }
  
  // src/services/api.ts
export const addQuestion = async (newQuestion: {
  content: string;
  author: string;
  hashtag: string[];
  broadType: string;
  questionID: string;
  likeNum: string[];
}) => {
  try {
    const response = await fetch('http://localhost:8888/api/v1/addquestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    });

    if (!response.ok) {
      throw new Error('網路請求失敗，狀態碼: ' + response.status);
    }

    const result = await response.json();
    return result; // 返回 API 的響應
  } catch (error) {
    console.error('添加問題時發生錯誤:', error);
    throw error; // 重新拋出錯誤以供上層捕獲
  }
};

