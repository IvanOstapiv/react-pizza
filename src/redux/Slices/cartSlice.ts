import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  sizes: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  id: any;
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  id: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
          findItem && findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      if (findItem) state.totalPrice = state.totalPrice - findItem.price * findItem.count;
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
  },
});

export const selectCart = (state: RootState) => state.cartReducer;
export const selectItemsById = (id: string) => (state: RootState) =>
  state.cartReducer.items.find((obj) => obj.id === id);
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
