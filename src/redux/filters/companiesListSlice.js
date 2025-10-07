import { createSlice } from '@reduxjs/toolkit';

const companiesListSlice = createSlice({
  name: 'companiesList',
  initialState: {
    companies: [],
    partnerships: [],
  },

  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setPartnerships: (state, action) => {
      state.partnerships = action.payload;
    },
  },
});

export const { setCompanies, setPartnerships } = companiesListSlice.actions;

export default companiesListSlice.reducer;
