// redux/slices/otherDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    debt_threshold: 0,
    min_acc_sum: 0,
    only_repayment: false,
    draftDebt: 0,
    draftMinSum: 0,
    draftActivity: false,
};

const otherDataSlice = createSlice({
    name: 'otherData',
    initialState,
    reducers: {
        setDebt: (state, action) => {
            state.debt_threshold = action.payload;
            state.draftDebt = action.payload;
        },
        setMinSum: (state, action) => {
            state.min_acc_sum = action.payload;
            state.draftMinSum = action.payload;
        },
        setActivity: (state, action) => {
            state.only_repayment = action.payload;
            state.draftActivity = action.payload;
        },

        setDraftDebt: (state, action) => {
            state.draftDebt = action.payload;
        },
        setDraftMinSum: (state, action) => {
            state.draftMinSum = action.payload;
        },
        setDraftActivity: (state, action) => {
            state.draftActivity = action.payload;
        },

        resetDrafts: (state) => {
            state.draftDebt = state?.debt_threshold;
            state.draftMinSum = state?.min_acc_sum;
            state.draftActivity = state?.only_repayment;
        },
    },
});

export const {
    setDebt,
    setMinSum,
    setActivity,
    setDraftDebt,
    setDraftMinSum,
    setDraftActivity,
    resetDrafts,
} = otherDataSlice.actions;

export default otherDataSlice.reducer;
