import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./action";

const initialState = {
  orders: [],
  error: false,
  isFetching: false,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    resetState: () => initialState,

    getOrderStart: (state) => {
      state.error = false;
      state.isFetching = true;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { resetState, getOrderStart, getOrderSuccess, getOrderFailure } =
  orderSlice.actions;

export default orderSlice.reducer;
