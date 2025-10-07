import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = document.getElementById('root_debts')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;

export const ordersApiActions = createApi({
  reducerPath: 'ordersApiActions',
  tagTypes: ['orders', 'order'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
      Accept: 'application/json',
    },
  }),
  endpoints: (build) => ({
    getOrders: build.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          const next = lastPage.links?.next;
          if (!next) return undefined;

          const nextPage = new URL(next, 'http://dummy').searchParams.get('page');
          return Number(nextPage);
        },
      },
      query: ({ queryArg, pageParam }) => {
        return {
          url: `orders/attach_orders?page=${pageParam}`,
          method: 'GET',
          params: queryArg,
        };
      },
      transformResponse: (response) => response?.data ?? [],
      providesTags: ['orders'],
    }),
    attachOrderToClosingDoc: build.mutation({
      query: ({ order_id, docs }) => ({
        url: `orders/${order_id}/attach_documents`,
        method: 'POST',
        body: { docs },
      }),
      invalidatesTags: ['orders'],
    }),

    detachOrderFromClosingDoc: build.mutation({
      query: ({ order_id, docs }) => ({
        url: `orders/${order_id}/detach_documents`,
        method: 'DELETE',
        body: { docs },
      }),
      invalidatesTags: ['orders'],
    }),
  }),
});

export const {
  useGetOrdersInfiniteQuery,
  useAttachOrderToClosingDocMutation,
  useDetachOrderFromClosingDocMutation,
} = ordersApiActions;
