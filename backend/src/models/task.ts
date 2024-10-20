import mongoose, { model, Schema } from 'mongoose';
import { Task,  TaskType} from '../types/task'
// TASK Schema
const taskSchema: Schema = new Schema(
  {
    task_id: {
      type: String,
      required: true
    },
    task_title: {
      type: String,
      required: true
    },
    task_content: {
      type: String,
      required: true
    },
    task_type: {
      type: String,
      required: true
    }
  },
  {
    timestamps: false
  }
);

taskSchema.set('toJSON', {
  versionKey: false
});

// TASKTYPE Schema
const taskTypeSchema: Schema = new Schema(
  {
    task_type_id: {
      type: String,
      required: true
    },
    task_type: {
      type: String,
      required: true
    }
  },
  {
    timestamps: false
  }
);

taskTypeSchema.set('toJSON', {
  versionKey: false
});

// Export the models
export const TaskModel = mongoose.models.task || model<Task>('task', taskSchema);
export const TaskTypeModel = mongoose.models.taskType || model<TaskType>('taskType', taskTypeSchema);
