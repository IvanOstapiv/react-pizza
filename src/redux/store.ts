import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './Slices/filterSlice';
import cartReducer from './Slices/cartSlice';
import pizzasReducer from './Slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filterReducer,
    cartReducer,
    pizzasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()