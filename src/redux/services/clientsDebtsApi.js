import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CLIENTS_DEBTS_URL = '/counterparties/calculation';

export const clientsDebtsApi = createApi({
  reducerPath: 'clientsDebtsApi',
  tagTypes: ['CLIENTS_DEBTS'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = document.getElementById('root_debts')?.getAttribute('token');
      if (token) headers.set('Authorization', token);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getClientsDebts: build.infiniteQuery({
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
        url: `${CLIENTS_DEBTS_URL}?page=${pageParam}`,
        method: 'GET',
        params: queryArg,
      }),
      transformResponse: (response) => ({
        data: response?.data?.data || [],
        links: response?.data?.links || {},
        meta: response?.data?.meta || {},
      }),

      providesTags: ['CLIENTS_DEBTS'],
    }),
  }),
});
export const { useGetClientsDebtsInfiniteQuery } = clientsDebtsApi;
