import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: localStorage.getItem('searchQueryBills') || '',
  filterCompanys: JSON.parse(localStorage.getItem('filterCompanys') || '[]') || [],
  filterCustomers: JSON.parse(localStorage.getItem('filterCustomersBills') || '[]') || [],
  filterStatus: JSON.parse(localStorage.getItem('filterStatusBills') || '[]') || [],
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.search = action.payload;
    },

    setFilterCustomers: (state, action) => {
      state.filterCustomers = action.payload;
      localStorage.setItem('filterCustomersBills', JSON.stringify(action.payload));
    },
  }
});

export const {
  setSearchQuery,
  setFilterCustomers
} = filtersSlice.actions;
export default filtersSlice.reducer;
