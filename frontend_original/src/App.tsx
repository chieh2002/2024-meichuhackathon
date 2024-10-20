import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

interface Article {
  id: number;
  title: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8888/api/v1/open_broad'); // 替換成你的 API URL
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', background: '#f0f0f0', padding: '10px' }}>
        <h2>Sidebar</h2>
        <ul>
          <li>TechBroad</li>
          <li>HappyBirthdayBroad</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '10px' }}>
        {/* Search Bar and Add Article Button */}
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ flex: 1, padding: '8px' }}
          />
          <button onClick={() => navigate('/add-article')} style={{ marginLeft: '10px' }}>
            Add Article
          </button>
        </div>

        {/* Article Titles */}
        <div>
          {articles
            .filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(article => (
              <div key={article.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '5px' }}>
                {article.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const AddArticle: React.FC = () => {
  const [broadType, setBroadType] = useState('Career'); // 新增文章類型
  const navigate = useNavigate();

  const handleAddArticle = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/v1/open_broad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ broadType }), // 傳送的 JSON
      });

      if (response.ok) {
        // 成功後返回主畫面
        navigate('/');
      } else {
        console.error('Error adding article');
      }
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2>Add New Article</h2>
      <input
        type="text"
        value={broadType}
        onChange={(e) => setBroadType(e.target.value)}
        style={{ padding: '8px', width: '100%' }}
      />
      <button onClick={handleAddArticle} style={{ marginTop: '10px' }}>
        Submit
      </button>
    </div>
  );
};

// App 元件
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-article" element={<AddArticle />} />
      </Routes>
    </Router>
  );
};

export default App;
