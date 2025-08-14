import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  draft: 0,
  customer: {},
  detail: {},
  numberBill: '',
  numberBillFirst: '',
  date: dayjs().locale('ru') || '',
  orders: [],
  signatory: {},
  contract: '',
  dateContract: '',
  numContract: '',
  nds: null,
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

    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    setSignatory: (state, action) => {
      state.signatory = action.payload;
    },

    setContract: (state, action) => {
      state.contract = action.payload;
    },

    setDateContract: (state, action) => {
      state.dateContract = action.payload;
    },

    setNumContract: (state, action) => {
      state.numContract = action.payload;
    },

    setNds: (state, action) => {
      state.nds = action.payload;
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
  setOrders,
  setSignatory,
  setContract,
  setDateContract,
  setNumContract,
  setNds
} = mainInfoSlice.actions;
export default mainInfoSlice.reducer;
