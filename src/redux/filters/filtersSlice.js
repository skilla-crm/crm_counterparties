import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counterpartyInvalidKpp: 0,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCounterpartyInvalidKpp: (state, action) => {
      state.counterpartyInvalidKpp = action.payload;
    },
    resetAllFilters: () => initialState,
  },
});

export const { setCounterpartyInvalidKpp, resetAllFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
