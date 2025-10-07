import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedStatus: '',
  selectedCompanies: [],
  selectedPartnerships: [],
  selectedContract: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedCompanies(state, action) {
      state.selectedCompanies = action.payload;
    },
    setSelectedContract(state, action) {
      state.selectedContract = action.payload;
    },
    setSelectedPartnerships(state, action) {
      state.selectedPartnerships = action.payload;
    },
    setSelectedStatus(state, action) {
      state.selectedStatus = action.payload;
    },

    resetAllFilters: () => initialState,
  },
});

export const {
  setSelectedCompanies,
  setSelectedPartnerships,
  setSelectedStatus,
  resetAllFilters,
  setSelectedContract,
} = filtersSlice.actions;

export default filtersSlice.reducer;
