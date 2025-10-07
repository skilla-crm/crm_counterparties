import { createSlice } from '@reduxjs/toolkit';

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState: {
    dateStartPicker: JSON.parse(localStorage.getItem('dateStartPicker')) || null,
    dateEndPicker: JSON.parse(localStorage.getItem('dateEndPicker')) || null,
  },
  reducers: {
    setDateStartPicker: (state, action) => {
      state.dateStartPicker = action.payload;
      localStorage.setItem('dateStartPicker', JSON.stringify(action.payload));
    },
    setDateEndPicker: (state, action) => {
      state.dateEndPicker = action.payload;
      localStorage.setItem('dateEndPicker', JSON.stringify(action.payload));
    },
    resetAllDates: (state) => {
      state.dateStartPicker = null;
      state.dateEndPicker = null;
      localStorage.setItem('dateStartPicker', null);
      localStorage.setItem('dateEndPicker', null);
    },
  },
});

export const { setDateStartPicker, setDateEndPicker, resetAllDates } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
