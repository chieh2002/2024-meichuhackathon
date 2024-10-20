import { TaskModel, TaskTypeModel } from '../models/task';
import { Task, TaskType } from '../types/task';
import { UserModel } from '../models/message';
import { User } from '../types/message';
// 獲取所有 task_type 列表
export const getTaskTypes: () => Promise<TaskType[]> = async () => {
  return TaskTypeModel.find();
};

// 根據 task_type 獲取 task 列表
export const getTasksByType: (task_type: string) => Promise<Task[]> = async (task_type) => {
  return TaskModel.find({ task_type: task_type });
};

// 根據 task_id 獲取 task 詳情
export const getTaskDetail: (task_id: string) => Promise<Task | null> = async (task_id) => {
  return TaskModel.findOne({ task_id: task_id });
};


// 儲存 task 到特定 user 的接受列表
export const saveTaskToAcceptList: (userId: string, taskId: string) => Promise<void> = async (userId, taskId) => {
    try {
      // 查找指定的 User 資料
      const user = await UserModel.findOne({ userId });
  
      if (!user) {
        console.log('User not found');
        return;
      }
  
  
      // 確保 task_accept_list 是一個數組
      if (!Array.isArray(user.task_accept_list)) {
        user.task_accept_list = [];
      }
  
      // 如果 task_id 尚未在 task_accept_list 中，則將其加入
      if (!user.task_accept_list.includes(taskId)) {
        user.task_accept_list.push(taskId);
  
        // 保存更新後的 User 資料
        await user.save();
  
        console.log(`Task ${taskId} added to user ${userId}'s accept list`);
      } else {
        console.log(`Task ${taskId} already in user ${userId}'s accept list`);
      }
    } catch (error) {
      console.error('Error saving task to accept list:', error);
    }
  };
