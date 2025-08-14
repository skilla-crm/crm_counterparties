import { createSlice } from '@reduxjs/toolkit';
import { getNextDay, getThreeDay } from '../../components/Genegal/FilterDate/DateMenu/utils/date';

const initialState = {
  dateStartPicker: localStorage.getItem('dateStartAccountan') || '',
  dateEndPicker: localStorage.getItem('dateEndAccountan')|| '',
  dateStart: localStorage.getItem('dateStartAccountan') || '',
  dateEnd: localStorage.getItem('dateEndAccountan') || '',
};

export const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setDateStart: (state, action) => {
      state.dateStart = action.payload;
      state.dateStartPicker =  action.payload ? new Date(`${action.payload}`) : null;
      localStorage.setItem('dateStartAccountan', action.payload);
    },
    setDateEnd: (state, action) => {
      state.dateEnd = action.payload;
      state.dateEndPicker = action.payload ? new Date(`${action.payload}`) : null;
      localStorage.setItem('dateEndAccountan', action.payload);
    },

    setDateStartPicker: (state, action) => {
      state.dateStartPicker = action.payload;
    },


    setDateEndPicker: (state, action) => {
      state.dateEndPicker = action.payload;
    },

    setResetDateRange: (state) => {
      localStorage.removeItem('dateStartAccountan');
      localStorage.removeItem('dateEndAccountan');
      state.dateStart = getThreeDay();
      state.dateEnd = getNextDay();
      state.dateStartPicker = new Date(getThreeDay());
      state.dateEndPicker = new Date(getNextDay());
    }
  }
});

export const {
  setDateStart,
  setDateEnd,
  setDateStartPicker,
  setDateEndPicker } =
  dateRangeSlice.actions;
export default dateRangeSlice.reducer;
