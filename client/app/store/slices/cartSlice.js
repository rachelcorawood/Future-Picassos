import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const catchAsync = (fn) => {
//   return (req, res, next) => fn(req, res, next).catch(next);
// };
// use this instead of try catch ?

export const fetchUserCart = createAsyncThunk('/cart', async (id) => {
  try {
    const { data } = await axios.get(`/api/cart`);
    return data;
  } catch (err) {
    console.error(err);
  }
});

export const addToCartDB = createAsyncThunk('/cart', async (newCartEntry) => {
  try {
    const { data } = await axios.post('/api/cart', newCartEntry);
    return data;
  } catch (err) {
    console.error(err);
  }
});

export const deleteFromCartDB = createAsyncThunk(
  '/api/cart',
  async (toDelete) => {
    try {
      await axios.delete('/api/cart', toDelete);
      return toDelete.productId;
    } catch (err) {
      console.error(err);
    }
  }
);

export const editCartDB = createAsyncThunk('/api/cart', async (toEdit) => {
  try {
    const { data } = await axios.put('/api/cart', toEdit);
    return data;
  } catch (err) {
    console.error(err);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.cartItems.push(...action.payload);
    });
    builder.addCase(addToCartDB.fulfilled, (state, action) => {
      state.cartItems.push(action.payload);
    });
    builder.addCase(deleteFromCartDB.fulfilled, (state, action) => {
      return state.filter((product) => product.productId !== action.payload);
    });
    builder.addCase(editCartDB.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
