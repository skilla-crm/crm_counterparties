import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token = document.getElementById('root_debts')?.getAttribute('token');
const DEBTS_URL = '/counterparties';

export const debtsApiActions = createApi({
  reducerPath: 'debtsApiActions',
  tagTypes: ['orders', 'order', 'debts', 'details'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      if (token) headers.set('Authorization', token);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getDebts: build.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          const next = lastPage.links?.next;
          if (!next) return undefined;
          const nextPage = new URL(next, 'http://dummy').searchParams.get('page');
          return Number(nextPage);
        },
      },
      query: ({ queryArg, pageParam }) => ({
        url: `${DEBTS_URL}?page=${pageParam}`,
        method: 'GET',
        params: queryArg,
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ['debts'],
    }),

    getDetailsList: build.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          const next = lastPage.links?.next;
          if (!next) return undefined;
          const nextPage = new URL(next, 'http://dummy').searchParams.get('page');
          return Number(nextPage);
        },
      },
      query: ({ pageParam = 1, queryArg }) => ({
        url: `${DEBTS_URL}/calculation/${queryArg.id}?page=${pageParam}`,
        method: 'GET',
        params: { ...queryArg.queryArgs },
      }),

      transformResponse: (response) => {
        return response.data;
      },
      providesTags: (result) =>
        result ? [{ type: 'details', id: 'LIST' }] : [{ type: 'details', id: 'LIST' }],
    }),
  }),
});
export const { useGetDebtsQuery, useGetDebtsInfiniteQuery, useGetDetailsListInfiniteQuery } =
  debtsApiActions;
