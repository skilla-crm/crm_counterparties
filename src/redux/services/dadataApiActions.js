// src/redux/dadataApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DADATA_TOKEN = process.env.REACT_APP_DADATA_TOKEN;

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
    }),
});

export const { useGetCompanyInfoMutation, useGetCompaniesByNameMutation } =
    dadataApiActions;
