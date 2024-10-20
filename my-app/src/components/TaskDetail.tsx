import React from 'react';

interface TaskDetailProps {
  taskName: string;
  taskDescription: string;
  onAccept: () => void;
  onDecline: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  taskName,
  taskDescription,
  onAccept,
  onDecline
}) => {
  return (
    <div>
      <h2>{taskName}</h2>
      <h3>{taskDescription}</h3>
      <div className=''>
        <button onClick={onAccept}>接受</button>
        <button onClick={onDecline}>放棄</button>
      </div>
    </div>
  );
};

export default TaskDetail;
