// src/redux/dadataApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DADATA_TOKEN = '72577aae3cb1de1dba79415c54bddfb11a28db21';

export const dadataApiActions = createApi({
    reducerPath: 'dadataApiActions',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Token ${DADATA_TOKEN}`);
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // поиск компании по ИНН/КПП
        getCompanyInfo: builder.mutation({
            query: ({ query, kpp }) => ({
                url: 'findById/party',
                method: 'POST',
                body: { query, count: 100, kpp },
            }),
        }),
        // поиск компании по названию
        getCompaniesByName: builder.mutation({
            query: ({ data }) => ({
                url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party',
                method: 'POST',
                body: { query: data },
            }),
        }),

        //поиск банка по бик
        getBankByBik: builder.mutation({
            query: ({ bik }) => ({
                url: 'findById/bank',
                method: 'POST',
                body: { query: bik },
            }),
            transformResponse: (response) => response.suggestions[0],
        }),
    }),
});

export const {
    useGetCompanyInfoMutation,
    useGetCompaniesByNameMutation,
    useGetBankByBikMutation,
} = dadataApiActions;
