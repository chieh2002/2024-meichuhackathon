// 定義 Task 類型
export type Task = {
    task_id: string;
    task_title: string;
    task_content: string;
    task_type: string;
  };
  
  // 定義 TaskType 類型
  export type TaskType = {
    task_type_id: string;
    task_type: string;
  };
  
  // 定義 TaskBody，省略 task_id
  export type TaskBody = Omit<Task, 'task_id'>;
  