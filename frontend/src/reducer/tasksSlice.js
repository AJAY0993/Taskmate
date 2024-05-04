import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  status: "idle",
};
const tasksSlice = createSlice({
  initialState,
  name: "task",
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== id);
    },

    updateTask: (state, action) => {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task,
      );
    },

    seedTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, seedTasks } =
  tasksSlice.actions;

export const getTask = (id) => {
  return (state) => state.task.tasks.find((task) => task._id === id);
};
export const getBoardTasks = (boardId) => {
  return (state) => state.tasks.tasks.filter((task) => task.board === boardId);
};
export const getTasks = (state) => state.tasks.tasks;
export const getCompletedTasks = (state) =>
  state.tasks.tasks.filter((task) => task.status === "completed");
export const getInProgressTasks = (state) =>
  state.tasks.tasks.filter((task) => task.status === "inProgress");
export const getTodoTasks = (state) =>
  state.tasks.tasks.filter((task) => task.status === "todo");
export const getOverdueTasks = (state) =>
  state.tasks.tasks.filter((task) => new Date(task.dueDate) < Date.now());

export default tasksSlice.reducer;
