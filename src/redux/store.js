import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { debtsApiActions } from './services/debtsApiActions';

import dateRangeReducer from './filters/dateRangeSlice';
import dateRangeAttachModalReducer from './filters/dateRangeAttachModalSlice';
import sortSlice from './sorting/sortSlice';
import filtersSlice from './filters/filtersSlice';
import modalReducer from './modalManager/modalSlice';
import tableDataReducer from './tableData/tableDataSlice';
import companiesListReducer from '../redux/filters/companiesListSlice';
import { filtersApiActions } from './services/filtersApiActions';
import { transactionApi } from './services/transactionApi';
import { ordersApiActions } from './services/ordersApiActions';
import { closingDocsApiActions } from './services/closingDocsApiActions';
import { updsApiActions } from './services/updsApiActions';
import { emailSenderApiActions } from './services/emailSenderApiActions';

export const store = configureStore({
  reducer: {
    sort: sortSlice,
    filters: filtersSlice,
    modal: modalReducer,
    dateRange: dateRangeReducer,
    dateAttachModalRange: dateRangeAttachModalReducer,
    tableData: tableDataReducer,
    companiesList: companiesListReducer,

    [debtsApiActions.reducerPath]: debtsApiActions.reducer,
    [filtersApiActions.reducerPath]: filtersApiActions.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [ordersApiActions.reducerPath]: ordersApiActions.reducer,
    [closingDocsApiActions.reducerPath]: closingDocsApiActions.reducer,
    [emailSenderApiActions.reducerPath]: emailSenderApiActions.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(debtsApiActions.middleware)
      .concat(filtersApiActions.middleware)
      .concat(transactionApi.middleware)
      .concat(ordersApiActions.middleware)
      .concat(closingDocsApiActions.middleware)
      .concat(updsApiActions.middleware)
      .concat(emailSenderApiActions.middleware),
});

setupListeners(store.dispatch);
