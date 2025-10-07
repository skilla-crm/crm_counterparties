import { createSlice } from '@reduxjs/toolkit';
const dateRangeAttachModalSlice = createSlice({
  name: 'dateRangeAttachModalSlice',
  initialState: {
    modalDateStartPicker: null,
    modalDateEndPicker: null,
  },
  reducers: {
    setModalDateStartPicker: (state, action) => {
      state.modalDateStartPicker = action.payload;
    },
    setModalDateEndPicker: (state, action) => {
      state.modalDateEndPicker = action.payload;
    },
    resetModalDates: (state) => {
      state.modalDateStartPicker = null;
      state.modalDateEndPicker = null;
    },
  },
});

export const { setModalDateStartPicker, setModalDateEndPicker, resetModalDates } =
  dateRangeAttachModalSlice.actions;

export default dateRangeAttachModalSlice.reducer;
