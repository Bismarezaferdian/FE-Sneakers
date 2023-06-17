import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./action";

const initialState = {
  products: [],
  // productFilters: [],
  isFetching: false,
  error: false,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    addToProduct: (state, action) => {
      state.products = action.payload;
    },
    addToFilter: (state, action) => {
      state.productFilters = action.payload;
    },
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSucces: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.products = action.payload;
    },
    // getProductFilter: (state, action) => {
    //   state.isFetching = false;
    //   state.error = false;
    //   if (action.payload.length <= 0) {
    //     state.productFilters = [];
    //   }
    //   state.productFilters = action.payload;
    // },

    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  addToProduct,
  addToFilter,
  getProductStart,
  getProductSucces,
  getProductFailure,
  getProductFilter,
} = productSlice.actions;
export default productSlice.reducer;
