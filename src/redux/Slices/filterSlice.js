import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryID: 0,
    sortID: 0,
    searchValue: '',
  };

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryID(state, action){
            console.log(action);
            state.categoryID = action.payload;
        },
        setSortID(state, action){
            state.sortID = action.payload
        },
        setSearchValue(state, action){
            state.searchValue = action.payload
        }
    }
})

export const selectFilter = (state) => state.filterReducer;

export const {setCategoryID, setSortID, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;