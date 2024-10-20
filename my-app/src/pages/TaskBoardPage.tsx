import React, { useState, useEffect } from 'react';
import TaskBoard from '../components/TaskBoard';
import { useNavigate } from 'react-router-dom';
import '../styles/TaskBoardPage.css'; // 確保 CSS 被引入

interface Task {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  tasks: Task[];
}

const TaskBoardPage: React.FC = () => {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); // 新增 categories 狀態
  const navigate = useNavigate();

  useEffect(() => {
    // 獲取類別
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8888/api/task/v1/tasks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
         
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const taskTypes = data.taskTypes;
        
        // 轉換為所需格式
        const newCategories: Category[] = await Promise.all(taskTypes.map(async (type: any) => {
          const tasksResponse = await fetch(`http://localhost:8888/api/task/v1/tasks_by_type`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskType: type.task_type }),
          });

          if (!tasksResponse.ok) {
            throw new Error('Network response was not ok');
          }

          const tasksData = await tasksResponse.json();
          console.log(tasksData)
          const tasks = tasksData.tasks.map((task: any) => ({
            id: task.task_id,
            name: task.task_title,
          }));

          return {
            id: type.task_type_id, // 使用 task_type_id 作為 id
            name: type.task_type,
            tasks: tasks,
          };
        }));

        setCategories(newCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategoryId(expandedCategoryId === categoryId ? null : categoryId);
  };

  const handleTaskClick = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };
  const handleTaskHomeClick = () => {
    navigate(`/`);
  };
  return (
    <div>
    <div>
      <button onClick={handleTaskHomeClick}>
        HOME
      </button>
    </div>
    <div className='fullscreen-div'>
      <TaskBoard
        categories={categories}
        expandedCategoryId={expandedCategoryId}
        toggleCategory={toggleCategory}
        onTaskClick={handleTaskClick}
      />
    </div>
    </div>
  );
};

export default TaskBoardPage;
