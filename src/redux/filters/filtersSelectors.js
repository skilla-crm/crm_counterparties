import { createSelector } from '@reduxjs/toolkit';

const selectFilters = (state) => state.filters;

export const selectTransactionTypeFilter = createSelector(
  [selectFilters],
  (filters) => filters.transactionTypeFilter
);

export const selectTransactionViewFilter = createSelector(
  [selectFilters],
  (filters) => filters.transactionViewFilter
);

export const selectSelectedCompanies = createSelector(
  [selectFilters],
  (filters) => filters.selectedCompanies
);

export const selectSelectedPartnerships = createSelector(
  [selectFilters],
  (filters) => filters.selectedPartnerships
);

export const selectSelectedStatus = createSelector(
  [selectFilters],
  (filters) => filters.selectedStatus || ''
);

export const selectSelectedActivity = createSelector(
  [selectFilters],
  (filters) => filters.selectedActivity || null
);

export const selectSelectedRecognizedType = createSelector(
  [selectFilters],
  (filters) => filters.selectedRecognizedType
);
