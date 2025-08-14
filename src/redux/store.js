
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { updsApiActions } from './updsApiActions';
//slice
import filtersSlice from './filters/slice';
import positionsSlice from './positions/slice';
import mainInfoSlice from './mainInfo/slice';
import validationSlice from './validation/slice';
import userSlice from './user/slice';
import dateRangeSlice from './dateRange/slice';
import logsSlice  from './logs/slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    filters: filtersSlice,
    positions: positionsSlice,
    mainInfo: mainInfoSlice,
    validation: validationSlice,
    dateRange: dateRangeSlice,
    logs: logsSlice,
    [updsApiActions.reducerPath]: updsApiActions.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(updsApiActions.middleware)
});

setupListeners(store.dispatch);
