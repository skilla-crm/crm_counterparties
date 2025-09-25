import { createSlice } from '@reduxjs/toolkit';;

const initialState = {
  customerValidation: true,
  numberValidation: true,
  dateRangeValidation: true,
};

export const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    setCustomerValidation: (state, action) => {
      state.customerValidation = action.payload;
    },

    setNumberValidation: (state, action) => {
      state.numberValidation = action.payload;
    },


    setDateRangeValidation: (state, action) => {
      state.dateRangeValidation = action.payload;
    }





  }
});

export const {
  setCustomerValidation,
  setNumberValidation,
  setDateRangeValidation
} = validationSlice.actions;
export default validationSlice.reducer;
