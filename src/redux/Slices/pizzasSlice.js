import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { selectPagination, categoryID, sortType, sortID, searchValue} = params;
  const {data} = await axios.get(
    `https://63f91d13a4ec283e998277c9.mockapi.io/items?page=${selectPagination + 1}&limit=4&${
      categoryID > 0 ? `category=${categoryID}` : ''
    }&sortBy=${sortType[sortID]}&order=desc&search=${searchValue}`
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading || success || error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    }),
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'success';
      }),
      builder.addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizza = (state) => state.pizzasReducer

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
