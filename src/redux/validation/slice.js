import { createSlice } from '@reduxjs/toolkit';;

const initialState = {
 customerValidation: true,
 detailValidation: true,
 numberValidation: true,
 positionsValidation: true

};

export const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    setCustomerValidation: (state, action) => {
      state.customerValidation = action.payload;
    },

    setDetailValidation: (state, action) => {
      state.detailValidation = action.payload;
    },

    setNumberValidation: (state, action) => {
      state.numberValidation = action.payload;
    },

    setPositionsValidation: (state, action) => {
      state.positionsValidation = action.payload;
    },




  }
});

export const {
  setCustomerValidation,
  setDetailValidation,
  setNumberValidation,
  setPositionsValidation
} = validationSlice.actions;
export default validationSlice.reducer;
