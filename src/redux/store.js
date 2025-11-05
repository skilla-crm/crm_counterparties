import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { counterpartyDetailsApiActions } from './services/counterpartyDetailsApiActions';
import { dadataApiActions } from './services/dadataApiActions';
import { counterpartiesListApiActions } from './services/counterpartiesListApiActions';
import { contractApiActions } from './services/contractApiActions';

import sortSlice from './sorting/sortSlice';
import modalReducer from './modalManager/modalSlice';
import detailTabReducer from './slices/detailTabSlice';
import detailChangesSlice from './slices/detailChangesSlice';
import otherDataSlice from './slices/otherDataSlice';

export const store = configureStore({
    reducer: {
        sort: sortSlice,
        modal: modalReducer,
        detailTab: detailTabReducer,
        detailChanges: detailChangesSlice,
        otherData: otherDataSlice,

        [counterpartyDetailsApiActions.reducerPath]:
            counterpartyDetailsApiActions.reducer,
        [counterpartiesListApiActions.reducerPath]:
            counterpartiesListApiActions.reducer,
        dadataApiActions: dadataApiActions.reducer,
        [contractApiActions.reducerPath]: contractApiActions.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        })
            .concat(counterpartyDetailsApiActions.middleware)
            .concat(counterpartiesListApiActions.middleware)
            .concat(dadataApiActions.middleware)
            .concat(contractApiActions.middleware),
});

setupListeners(store.dispatch);
