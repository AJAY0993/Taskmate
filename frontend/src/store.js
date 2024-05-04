import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducer/userSlice";
import tasksSlice from "./reducer/tasksSlice";
import boardsSlice from "./reducer/boardsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    tasks: tasksSlice,
    boards: boardsSlice,
  },
});

export default store;
