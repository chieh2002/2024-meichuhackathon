import * as uuid from 'uuid'
import * as taskRepo from '../repo/task' // 修改為從 task repo 引入
import { Task, TaskBody, TaskType } from '../types/task' // 修改為從 task types 引入

// 獲取所有 task 列表
export const getAllTasks: () => Promise<TaskType[]> = async () => {
  return taskRepo.getTaskTypes() // 使用 taskRepo 中的 getTaskTypes 函數
}

// 根據 broadType 獲取特定類型的 task 列表
export const getTypeTasks: (taskType: string) => Promise<Task[]> = async (taskType) => {
  return taskRepo.getTasksByType(taskType) // 使用 taskRepo 中的 getTasksByType 函數
}

// 根據 questionId 獲取 task 詳情（假設 questionId 對應於 taskId）
export const getTaskDetail: (taskId: string) => Promise<Task | null> = async (taskId) => {
  return taskRepo.getTaskDetail(taskId) // 使用 taskRepo 中的 getTaskDetail 函數
}


export const addTaskToUserAcceptList = async (userId: string, taskId: string): Promise<void> => {
    try {
      // 使用 repo 中的 saveTaskToAcceptList 函數
      await taskRepo.saveTaskToAcceptList(userId, taskId);
      console.log(`Task ${taskId} successfully added to user ${userId}'s accept list.`);
    } catch (error) {
      console.error(`Failed to add task ${taskId} to user ${userId}'s accept list:`, error);
    }
  };
