import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


export interface FilterSliceState {
    categoryID: number;
    sortID: number;
    searchValue: string;
}

const initialState: FilterSliceState = {
    categoryID: 0,
    sortID: 0,
    searchValue: '',
  };

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryID(state, action: PayloadAction<number> ){
            console.log(action);
            state.categoryID = action.payload;
        },
        setSortID(state, action: PayloadAction<number>){
            state.sortID = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>){
            state.searchValue = action.payload
        }
    }
})

export const selectFilter = (state: RootState) => state.filterReducer;

export const {setCategoryID, setSortID, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;