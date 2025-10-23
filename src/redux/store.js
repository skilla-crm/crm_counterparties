import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { counterpartyDetailsApiActions } from './services/counterpartyDetailsApiActions';
import { dadataApiActions } from './services/dadataApiActions';
import { counterpartiesListApiActions } from './services/counterpartiesListApiActions';

import sortSlice from './sorting/sortSlice';
import modalReducer from './modalManager/modalSlice';

export const store = configureStore({
    reducer: {
        sort: sortSlice,
        modal: modalReducer,

        [counterpartyDetailsApiActions.reducerPath]:
            counterpartyDetailsApiActions.reducer,
        [counterpartiesListApiActions.reducerPath]:
            counterpartiesListApiActions.reducer,
        dadataApiActions: dadataApiActions.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        })
            .concat(counterpartyDetailsApiActions.middleware)
            .concat(counterpartiesListApiActions.middleware)
            .concat(dadataApiActions.middleware),
});

setupListeners(store.dispatch);
