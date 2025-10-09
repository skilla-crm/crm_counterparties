import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { counterpartiesApiActions } from './services/counterpartiesApiActions';

import sortSlice from './sorting/sortSlice';
import modalReducer from './modalManager/modalSlice';

export const store = configureStore({
    reducer: {
        sort: sortSlice,
        modal: modalReducer,

        [counterpartiesApiActions.reducerPath]:
            counterpartiesApiActions.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(counterpartiesApiActions.middleware),
});

setupListeners(store.dispatch);
