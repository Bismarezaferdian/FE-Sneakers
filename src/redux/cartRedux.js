import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./action";

// const initialState = {
//   userId: null,
//   products: [],
//   quantity: 0,
//   total: 0,
//   error: false,
//   isFetch: false,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

//   reducers: {
//     addCartStart: (state) => {
//       state.error = false;
//       state.isFetch = true;
//     },

//     addToCart: (state, { payload }) => {
//       console.log(payload);
//       state.products.push(payload);
//       state.total += payload.products[0].price * payload.products[0].quantity;
//     },
//     addCartFailure: (state) => {
//       state.isFetch = false;
//       state.error = true;
//     },

//     // addQty
//   },
// });
// export const { addToCart, addCartFailure, addCartStart } = cartSlice.actions;
// export default cartSlice.reducer;

const initialState = {
  _id: null,
  userId: null,
  products: [],
  qty: 0,
  total: 0,
  weight: 0,
  error: false,
  isFetch: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    addCartStart: (state) => {
      state.isFetch = true;
      state.error = false;
    },

    addToCart: (state, { payload }) => {
      state.isFetch = false;
      state.error = false;
      //cek apakah payload.products sebuah array
      if (payload.products instanceof Array) {
        payload.products.forEach((product) => {
          const inCart = state.products.find(
            (item) =>
              item._id === product._id &&
              item.variant.color === product.variant.color &&
              item.variant.size === product.variant.size
          );
          if (!inCart) {
            state.products.push(product);
            state.qty += 1;
            state.total += product.quantity * product.price;
            state.weight += product.weight;
          }
        });
      } else {
        // Check if the product is already in the cart
        const inCart = state.products.find(
          (item) =>
            item._id === payload.products._id &&
            item.variant.color === payload.products.variant.color &&
            item.variant.size === payload.products.variant.size
        );
        // If the payload is already in the cart, update its quantity
        if (inCart) {
          inCart.quantity += payload.products.quantity;
          state.total += inCart.quantity * inCart.price;
          state.weight += inCart.weight;
        } else {
          // If the payload is not in the cart, add it
          state._id = payload._id;
          state.products.push(payload.products);
          state.qty += 1;
          state.total += payload.products.quantity * payload.products.price;
          state.weight += payload.products.weight;
        }
      }

      state._id = payload._id;
      state.userId = payload.userId;
    },

    addQty: (state, { payload }) => {
      // console.log(payload);
      const inCart = state.products.find(
        (item) =>
          item._id === payload._id &&
          item.variant.color === payload.variant.color &&
          item.variant.size === payload.variant.size
      );
      if (inCart) {
        inCart.quantity += 1;
        state.total += inCart.price;
        state.weight += inCart.weight;
      }
      state.isFetch = false;
      state.error = false;
    },

    addCartFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    removeQty: (state, { payload }) => {
      const inCart = state.products.find(
        (item) =>
          item._id === payload._id &&
          item.variant.color === payload.variant.color &&
          item.variant.size === payload.variant.size
      );
      // if (inCart) inCart.quantity -= 1;

      if (inCart && inCart.quantity > 1) {
        inCart.quantity -= 1;
        state.total -= inCart.price;
        state.weight -= inCart.weight;
      } else if (inCart && inCart.quantity === 1) {
        state.products.splice(
          // state.products.indexOf(
          state.products.findIndex(
            (item) =>
              item._id === payload._id &&
              item.variant.color === payload.variant.color &&
              item.variant.size === payload.variant.size
          ),
          1
        );
        state.total -= inCart.price;
        state.qty -= 1;
        state.weight -= inCart.weight;
      }
      state.isFetch = false;
      state.error = false;
    },
    resetState: () => initialState,
  },
});

export const {
  addToCart,
  addQty,
  removeQty,
  removeChart,
  addCartStart,
  addCartFailure,
  resetState,
} = cartSlice.actions;
export default cartSlice.reducer;

// const getTime = (time) =>
//     new Date(time).toLocaleString("id-ID", {
//       timeZone: "Asia/Jakarta",
//       dateStyle: "long",
//     });

//   console.log(getTime(product.createdAt));
