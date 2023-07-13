import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./action";

const initialState = {
  userId: null,
  products: [],
  error: false,
  isFetching: false,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    resetState: () => initialState,

    orderStart: (state) => {
      state.error = false;
      state.isFetching = true;
    },
    addToOrderRedux: (state, { payload }) => {
      state.isFetching = false;
      state.error = false;
      state.userId = payload.userId;
      state.products = payload.products;
    },
    orderSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    updateOrder: (state, { payload }) => {
      state.isFetching = false;
      state.error = false;
      state.products = payload;
    },

    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  resetState,
  orderStart,
  orderSuccess,
  addToOrderRedux,
  updateOrder,
  getOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
