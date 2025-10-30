import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeTab: 'general',
};

const detailTabSlice = createSlice({
    name: 'detailTab',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        resetActiveTab: (state) => {
            state.activeTab = 'general';
        },
    },
});

export const { setActiveTab, resetActiveTab } = detailTabSlice.actions;
export default detailTabSlice.reducer;
