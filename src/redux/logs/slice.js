import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [],
  exchange: {}
};

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogs: (state, action) => {
      state.logs = action.payload;
    },

    setExchange: (state, action) => {
      state.exchange = action.payload;
    },
  }
});

export const {
  setLogs, setExchange
} = logsSlice.actions;
export default logsSlice.reducer;
