import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'sum',
  sortDir: '-',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action) => {
      const { type, dir } = action.payload;

      if (state.sortBy === type && state.sortDir === dir) {
        state.sortBy = '';
        state.sortDir = '';
      } else {
        state.sortBy = type;
        state.sortDir = dir;
      }
    },
    resetSort: () => initialState,
  },
});

export const { setSort, resetSort } = sortSlice.actions;
export default sortSlice.reducer;
