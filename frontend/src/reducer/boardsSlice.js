import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  status: "idle",
};

const boardsSlice = createSlice({
  initialState,
  name: "boards",
  reducers: {
    addBoard(state, action) {
      state.boards.push(action.payload);
    },

    deleteBoard(state, action) {
      const id = action.payload;
      state.boards = state.boards.filter((board) => board._id !== id);
    },

    updateBoard(state, action) {
      const updatedBoard = action.payload;
      state.boards = state.boards.map((board) =>
        board._id === updatedBoard._id ? updatedBoard : board,
      );
    },

    seedboards(state, action) {
      state.boards = action.payload;
    },
  },
});

export const { addBoard, updateBoard, deleteBoard, seedboards } =
  boardsSlice.actions;

export const getBoard = (id) => {
  return (state) => state.boards.boards.find((board) => board._id === id);
};
export const getBoards = (state) => state.boards.boards;

export default boardsSlice.reducer;
