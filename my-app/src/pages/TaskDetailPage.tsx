import React, { useEffect, useState } from 'react';
import TaskDetail from '../components/TaskDetail';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/TaskBoardPage.css'; // 確保 CSS 被引入

const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // 錯誤狀態

  useEffect(() => {
    const fetchTaskDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8888/api/task/v1/task_detail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ taskId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch task detail');
        }

        const data = await response.json();
        const task = data.task;

        // 更新任務名稱和描述
        setTaskName(task.task_title);
        setTaskDescription(task.task_content);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setError('無法獲取任務詳細資料。');
      }
    };

    fetchTaskDetail();
  }, [taskId]);

  const handleAccept = () => {
    console.log('任務已接受');
    navigate('/taskboard');
  };

  const handleDecline = () => {
    console.log('任務已放棄');
    navigate('/taskboard');
  };

  return (
    <div>
      {error ? ( // 錯誤顯示
        <div className="error-message">{error}</div>
      ) : (
        <TaskDetail
          taskName={taskName}
          taskDescription={taskDescription}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </div>
  );
};

export default TaskDetailPage;
