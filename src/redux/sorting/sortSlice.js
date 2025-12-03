import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sortBy: 'share_of_partnership_revenue',
    sortDir: 'desc',
};

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort: (state, action) => {
            const type = action?.payload?.type;
            const dir = action?.payload?.dir;

            if (state.sortBy === type && state.sortDir === dir) {
                state.sortBy = '';
                state.sortDir = '';
            } else {
                state.sortBy = type;
                state.sortDir = dir;
            }
        },
        resetSort: (state) => {
            state.sortBy = 'share_of_partnership_revenue';
            state.sortDir = 'desc';

        },
    },
});

export const { setSort, resetSort } = sortSlice.actions;
export default sortSlice.reducer;
