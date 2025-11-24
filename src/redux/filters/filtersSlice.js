import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counterpartyCorrectKpp: 0,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCounterpartiesCorrectKpp: (state, action) => {
      state.counterpartyCorrectKpp = action.payload;
    },
    resetAllFilters: () => initialState,
  },
});

export const { setCounterpartiesCorrectKpp, resetAllFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
