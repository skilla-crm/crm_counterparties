import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import sortSlice from './sorting/sortSlice';
import filtersSlice from './filters/filtersSlice';
import modalSlice from './modalManager/modalSlice';
import detailTabSlice from './slices/detailTabSlice';
import detailChangesSlice from './slices/detailChangesSlice';
import otherDataSlice from './slices/otherDataSlice';
import dateRangeSlice from './filters/dateRangeSlice';
import ratesSlice from './rates/slice';
import ratesContractSlice from './ratesContract/slice';

import { counterpartyDetailsApiActions } from './services/counterpartyDetailsApiActions';
import { dadataApiActions } from './services/dadataApiActions';
import { counterpartiesListApiActions } from './services/counterpartiesListApiActions';
import { contractApiActions } from './services/contractApiActions';
import { yandexApi } from './services/yandexApi';

export const store = configureStore({
    reducer: {
        sort: sortSlice,
        filters: filtersSlice,
        modal: modalSlice,
        detailTab: detailTabSlice,
        detailChanges: detailChangesSlice,
        otherData: otherDataSlice,
        dateRange: dateRangeSlice,
        rates: ratesSlice,
        ratesContract: ratesContractSlice,

        [counterpartyDetailsApiActions.reducerPath]:
            counterpartyDetailsApiActions.reducer,
        [counterpartiesListApiActions.reducerPath]:
            counterpartiesListApiActions.reducer,
        [dadataApiActions.reducerPath]: dadataApiActions.reducer,
        [contractApiActions.reducerPath]: contractApiActions.reducer,
        [yandexApi.reducerPath]: yandexApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        })
            .concat(counterpartyDetailsApiActions.middleware)
            .concat(counterpartiesListApiActions.middleware)
            .concat(dadataApiActions.middleware)
            .concat(contractApiActions.middleware)
            .concat(yandexApi.middleware),
});

setupListeners(store.dispatch);
