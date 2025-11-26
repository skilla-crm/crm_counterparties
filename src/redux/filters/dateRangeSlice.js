import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    dateStartPicker:
            /* JSON.parse(localStorage.getItem('dateStartPicker')) || */ '',
    dateEndPicker:
          /*   JSON.parse(localStorage.getItem('dateEndPicker')) ||  */'',
}

const dateRangeSlice = createSlice({
    name: 'dateRange',
    initialState,
    reducers: {
        setDateStartPicker: (state, action) => {
            state.dateStartPicker = action.payload;
            /*   localStorage.setItem(
                  'dateStartPicker',
                  JSON.stringify(action.payload)
              ); */
        },
        setDateEndPicker: (state, action) => {
            state.dateEndPicker = action.payload;
            /*  localStorage.setItem(
                 'dateEndPicker',
                 JSON.stringify(action.payload)
             ); */
        },
        resetAllDates: (state) => {
            state.dateStartPicker = '';
            state.dateEndPicker = '';
            /*  localStorage.setItem('dateStartPicker', null);
             localStorage.setItem('dateEndPicker', null); */
        },
    },
});

export const { setDateStartPicker, setDateEndPicker, resetAllDates } =
    dateRangeSlice.actions;

export default dateRangeSlice.reducer;
