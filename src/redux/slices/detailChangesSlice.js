import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    hasUnsavedChanges: false,
};

const detailChangesSlice = createSlice({
    name: 'detailChanges',
    initialState,
    reducers: {
        setHasUnsavedChanges: (state, action) => {
            state.hasUnsavedChanges = action.payload;
        },
        resetHasUnsavedChanges: (state) => {
            state.hasUnsavedChanges = false;
        },
    },
});

export const { setHasUnsavedChanges, resetHasUnsavedChanges } =
    detailChangesSlice.actions;
export default detailChangesSlice.reducer;
