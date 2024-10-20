import React from 'react';
import TaskDetail from '../components/TaskDetail';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/TaskBoardPage.css'; // 確保 CSS 被引入

const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  // 根據 taskId 假設我們獲取了任務的詳細資料
  const task = {
    id: taskId,
    name: `任務${taskId}`,
    description: '這是一個詳細的任務描述，描述任務的內容及要求。',
  };

  const handleAccept = () => {
    console.log('任務已接受');
    navigate('/taskboard');
  };

  const handleDecline = () => {
    console.log('任務已放棄');
    navigate('/taskboard');
  };

  return (
    <div className=''>
    <TaskDetail
      taskName={task.name}
      taskDescription={task.description}
      onAccept={handleAccept}
      onDecline={handleDecline}
    /></div>
  );
};

export default TaskDetailPage;
