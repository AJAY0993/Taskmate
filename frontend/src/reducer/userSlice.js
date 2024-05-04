import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const getIsAuthenticated = (state) => state.user.isAuthenticated;
export const getUser = (state) => state.user.user;
export default userSlice.reducer;
