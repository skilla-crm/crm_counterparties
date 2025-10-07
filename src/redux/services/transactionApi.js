import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const ROOT_URL = 'https://api2.skilla.ru/api';

const TRANSACTIONS_URL = '/bank/transactions';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  tagTypes: ['TRANSACTION'],
  baseQuery: fetchBaseQuery({
    baseUrl: ROOT_URL,
    prepareHeaders: (headers) => {
      const token = document.getElementById('root_debts')?.getAttribute('token');
      if (token) headers.set('Authorization', token);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getTransaction: build.query({
      query: ({ id }) => ({
        url: `${TRANSACTIONS_URL}/detail/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['TRANSACTION'],
    }),
    updateTransaction: build.mutation({
      query: ({ id, data }) => ({
        url: `/bank/transactions/update/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['TRANSACTION'],
    }),
    deleteTransaction: build.mutation({
      query: ({ id }) => ({
        url: `/bank/transactions/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TRANSACTION'],
    }),
  }),
});
export const {
  useGetTransactionQuery,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;
