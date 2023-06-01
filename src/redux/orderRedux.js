import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./action";

const initialState = {
  orders: [],
  error: false,
  isFetch: false,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    resetState: () => initialState,
  },
});

export const { resetState } = orderSlice.actions;

export default orderSlice.reducer;
