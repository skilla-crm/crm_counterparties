import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token = document.getElementById('root_debts')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;
export const emailSenderApiActions = createApi({
  reducerPath: 'emailSenderApiActions',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (token) headers.set('Authorization', token);

      return headers;
    },
  }),
  endpoints: (build) => ({
    sendDebtNotification: build.mutation({
      query: (body) => ({
        url: `counterparties/notification`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useSendDebtNotificationMutation } = emailSenderApiActions;
