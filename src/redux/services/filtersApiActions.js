import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = process.env.REACT_APP_BASE_URL;

export const filtersApiActions = createApi({
  reducerPath: 'filtersApiActions',
  tagTypes: ['companies'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = document.getElementById('root_debts')?.getAttribute('token');

      if (token) {
        headers.set('Authorization', token);
      }
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    getCompanies: build.query({
      query: () => ({
        url: `/counterparties/partnerships`,
        method: 'GET',
      }),
      transformResponse: (response) => response?.data,
      providesTags: ['companies'],
    }),
  }),
});

export const { useGetCompaniesQuery } = filtersApiActions;
