import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { FilterSliceState } from './filterSlice';

export type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  type: string[];
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
  status: Status;
  selectPagination: number;
}

const initialState: PizzaSliceState = {
  items: [],
  selectPagination: 0,
  status: Status.LOADING, // loading || success || error
};


export const fetchPizzas = createAsyncThunk<PizzaItem[], FilterSliceState & {
  selectPagination: number;
  sortType: string[];
  orderType: string[];
}>('pizzas/fetchPizzasStatus', async (params) => {
  const { selectPagination, categoryID, sortType, sortID, orderType, orderID, searchValue} = params;
  const { data } = await axios.get<PizzaItem[]>(
    `https://63f91d13a4ec283e998277c9.mockapi.io/items?page=${selectPagination+1}&${
      categoryID > 0 ? `category=${categoryID}` : ''
    }&sortBy=${sortType[sortID]}&order=${orderType[orderID]}&search=${searchValue}`
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
    setSelectPagination: (state, action: PayloadAction<number>) => {
      state.selectPagination = action.payload;
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

export const { setItems, setSelectPagination } = pizzasSlice.actions;

export default pizzasSlice.reducer;
