
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { counterpartiesApiActions } from './counterpartiesApiActions';
//slice


export const store = configureStore({
  reducer: {

    [counterpartiesApiActions.reducerPath]: counterpartiesApiActions.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(counterpartiesApiActions.middleware)
});

setupListeners(store.dispatch);
