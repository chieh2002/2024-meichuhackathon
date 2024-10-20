import React from 'react';
import { Message } from '../../services/api'; // 引入 Message 類型

interface ArticleListProps {
  articles: Message[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div className="article-list">
      {articles.map((article) => (
        <div key={article._id} className="article-card">
          <h3>{article.content}</h3>
          <p>作者: {article.author}</p>
          <p>標籤: {article.hashtag.join(', ')}</p>
          <p>類型: {article.broadType}</p>
          <p>發佈時間: {new Date(article.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
