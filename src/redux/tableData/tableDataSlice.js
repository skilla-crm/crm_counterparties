// tableDataSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientsDebts: [],
  ourDebts: [],
};

const tableDataSlice = createSlice({
  name: 'tableData',
  initialState,
  reducers: {
    setTabData: (state, action) => {
      const { tab, data } = action.payload;
      if (tab === 'clientsDebts') state.transactions = data;
      if (tab === 'ourDebts') state.extractions = data;
    },
  },
});

export const { setTabData } = tableDataSlice.actions;
export default tableDataSlice.reducer;
