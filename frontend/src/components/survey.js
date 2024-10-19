import React, { useState } from 'react';
import axios from 'axios';
// import './Survey.css'; // 可以添加CSS来美化页面

function Survey() {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: [],
    question3: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const selectedOptions = answers[name];
    if (selectedOptions.includes(value)) {
      setAnswers({
        ...answers,
        [name]: selectedOptions.filter((option) => option !== value),
      });
    } else {
      setAnswers({
        ...answers,
        [name]: [...selectedOptions, value],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 提交答案到后端
      const response = await axios.post('http://localhost:5000/api/survey', answers);
      if (response.data.success) {
        alert('問卷提交成功！');
      }
    } catch (error) {
      console.error('提交問卷時出錯:', error);
    }
  };

  return (
    <div className="survey-container">
      <h1>問卷調查</h1>
      <form onSubmit={handleSubmit}>
        {/* 問題1：單選題 */}
        <div className="question">
          <label>1. 你最喜歡的顏色是什麼？</label>
          <div>
            <label>
              <input
                type="radio"
                name="question1"
                value="紅色"
                onChange={handleInputChange}
              />
              紅色
            </label>
            <label>
              <input
                type="radio"
                name="question1"
                value="藍色"
                onChange={handleInputChange}
              />
              藍色
            </label>
            <label>
              <input
                type="radio"
                name="question1"
                value="綠色"
                onChange={handleInputChange}
              />
              綠色
            </label>
          </div>
        </div>

        {/* 問題2：多選題 */}
        <div className="question">
          <label>2. 你喜歡的興趣是哪些？（多選）</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="question2"
                value="讀書"
                onChange={handleCheckboxChange}
              />
              讀書
            </label>
            <label>
              <input
                type="checkbox"
                name="question2"
                value="運動"
                onChange={handleCheckboxChange}
              />
              運動
            </label>
            <label>
              <input
                type="checkbox"
                name="question2"
                value="旅行"
                onChange={handleCheckboxChange}
              />
              旅行
            </label>
          </div>
        </div>

        {/* 問題3：文本題 */}
        <div className="question">
          <label>3. 請輸入你對我們的建議：</label>
          <div>
            <textarea
              name="question3"
              value={answers.question3}
              onChange={handleInputChange}
              rows="4"
              cols="50"
              placeholder="在這裡輸入你的建議..."
            />
          </div>
        </div>

        {/* 提交按鈕 */}
        <div className="submit-btn">
          <button type="submit">提交問卷</button>
        </div>
      </form>
    </div>
  );
}

export default Survey;
