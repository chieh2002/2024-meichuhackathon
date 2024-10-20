import React from 'react';
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

interface TaskBoardProps {
  categories: Category[];
  expandedCategoryId: string | null;
  toggleCategory: (categoryId: string) => void;
  onTaskClick: (taskId: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  categories,
  expandedCategoryId,
  toggleCategory,
  onTaskClick
}) => {
  return (
    <div className="container">  {/* 添加容器類名 */}
    {categories.map(category => (
      <div key={category.id} className="category">  {/* 添加類名以應用樣式 */}
        <button onClick={() => toggleCategory(category.id)} className="task-button">{category.name}</button>
        {expandedCategoryId === category.id && (
          <div> 
            {category.tasks.length > 0 ? (
              category.tasks.map(task => (
                <button key={task.id} className="sub-task-button" onClick={() => onTaskClick(task.id)}>
                  {task.name}
                </button>
              ))
            ) : (
              <p></p>
            )}
          </div>
        )}
      </div>
    ))}
  </div>
  
  );
};

export default TaskBoard;
