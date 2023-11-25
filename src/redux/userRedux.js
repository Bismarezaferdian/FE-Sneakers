import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    massageError: "",
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },

    loginFailure: (state, { payload }) => {
      state.error = true;
      state.isFetching = false;
      state.massageError = payload;
    },
    logout: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
      state.massageError = "";
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
