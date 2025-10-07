import { createSelector } from '@reduxjs/toolkit';

export const isAnyFilterActive = (state) => {
  const { selectedCompanies, selectedPartnerships, selectedStatus, selectedContract } =
    state.filters;
  const { sortBy, sortDir } = state.sort;

  return (
    selectedCompanies.length > 0 ||
    selectedPartnerships.length > 0 ||
    selectedStatus !== '' ||
    selectedContract !== null ||
    sortBy !== 'sum' ||
    sortDir !== '-'
  );
};

export const selectSelectedActivity = createSelector(
  (state) => state.filters.selectedActivity,
  (selected) => selected || []
);
