import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { FilterSliceState } from './filterSlice';

type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  type: number[];
  sizes: number[];
  price: number;
}

export enum Status {  // export для майбутнього використання
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading || success || error
};


export const fetchPizzas = createAsyncThunk<PizzaItem[], FilterSliceState & {
  selectPagination: number;
  sortType: string[];
}>('pizzas/fetchPizzasStatus', async (params) => {
  const { selectPagination, categoryID, sortType, sortID, searchValue} = params;
  const { data } = await axios.get<PizzaItem[]>(
    `https://63f91d13a4ec283e998277c9.mockapi.io/items?page=${selectPagination + 1}&limit=4&${
      categoryID > 0 ? `category=${categoryID}` : ''
    }&sortBy=${sortType[sortID]}&order=desc&search=${searchValue}`
  );
  return data;
});

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    }),
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = Status.SUCCESS;
      }),
      builder.addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizza = (state: RootState) => state.pizzasReducer

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
