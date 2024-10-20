import React, { useState } from 'react';
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
  const navigate = useNavigate()


  const categories: Category[] = [
    {
      id: 'category1',
      name: '短期任務',
      tasks: [
        { id: 'taskA', name: '任務A' },
        { id: 'taskB', name: '任務B' },
        { id: 'taskC', name: '任務C' },
        { id: 'taskD', name: '任務D' }
      ],
    },
    { id: 'category2', name: '長期任務', tasks: [] },
    { id: 'category3', name: '已完成任務', tasks: [] },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategoryId(expandedCategoryId === categoryId ? null : categoryId);
  };
 
  const handleTaskClick = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className='fullscreen-div '>
      
      <TaskBoard
        categories={categories}
        expandedCategoryId={expandedCategoryId}
        toggleCategory={toggleCategory}
        onTaskClick={handleTaskClick}
      />
    
</div>

   
  );
};

export default TaskBoardPage;
