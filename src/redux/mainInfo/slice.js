import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  draft: 0,
  customer: {},
  detail: {},
  numberBill: '',
  numberBillFirst: '',
  date: dayjs().locale('ru') || '',
  dateStart: '',
  dateEnd: '',

};

export const mainInfoSlice = createSlice({
  name: 'mainInfo',
  initialState,
  reducers: {

    setDraft: (state, action) => {
      state.draft = action.payload;
    },

    setCustomer: (state, action) => {
      state.customer = action.payload;
    },

    setDetail: (state, action) => {
      state.detail = action.payload;
      state.nds = action.payload?.nds;
    },

    setNumberBill: (state, action) => {
      state.numberBill = action.payload;
    },

    setNumberBillFirst: (state, action) => {
      state.numberBillFirst = action.payload;
    },

    setDate: (state, action) => {
      state.date = action.payload;
    },

    setDateStart: (state, action) => {
      state.dateStart = action.payload;
    },

    setDateEnd: (state, action) => {
      state.dateEnd = action.payload;
    }
  }
});

export const {
  setDraft,
  setCustomer,
  setDetail,
  setNumberBill,
  setNumberBillFirst,
  setDate,
  setDateStart,
  setDateEnd
} = mainInfoSlice.actions;
export default mainInfoSlice.reducer;
