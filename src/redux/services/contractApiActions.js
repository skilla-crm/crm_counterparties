import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = document
    .getElementById('root_counterparties')
    ?.getAttribute('token');

const CONTRACT_URL = '/company-contracts';

export const contractApiActions = createApi({
    reducerPath: 'contractApiActions',
    tagTypes: ['contract'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers) => {
            if (token) headers.set('Authorization', token);
            return headers;
        },
    }),

    endpoints: (build) => ({
        //ДЕТАЛКА ДОГОВОРА
        getContract: build.query({
            query: ({ contractId }) => ({
                url: `${CONTRACT_URL}/${contractId}`,
                method: 'GET',
            }),
            transformResponse: (response) => response.data,
        }),

        //СОЗДАНИЕ ДОГОВОРА
        createContract: build.mutation({
            query: ({ data }) => ({
                url: `${CONTRACT_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        // УДАЛЕНИЕ ДОГОВОРА
        deleteContract: build.mutation({
            query: ({ contractId }) => ({
                url: `${CONTRACT_URL}/${contractId}`,
                method: 'DELETE',
            }),
        }),
        //СНЯТЬ ОТМЕКУ О ПОДПИСАИИ С ОРИГИНАЛА
        unmarkOriginalContract: build.mutation({
            query: ({ contractId, data }) => ({
                url: `${CONTRACT_URL}/unmark/${contractId}`,
                method: 'POST',
                body: data,
            }),
        }),
        //ПОДПИСАНИЕ ОРИГИНАЛА ДОГОВОРА
        signOriginalContract: build.mutation({
            query: ({ contractId, data }) => ({
                url: `${CONTRACT_URL}/sign_original/${contractId}`,
                method: 'POST',
                body: data,
            }),
        }),

        //ОТПРАВКА ОРИГИНАЛА ДОГОВОРА
        sendOriginalContract: build.mutation({
            query: ({ contractId, data }) => ({
                url: `${CONTRACT_URL}/send_original/${contractId}`,
                method: 'POST',
                body: data,
            }),
        }),
        //ОТПРАВКА ДОГОВОРА ПО ПОЧТЕ
        sendByEmailContract: build.mutation({
            query: ({ data }) => ({
                url: `${CONTRACT_URL}/send`,
                method: 'POST',
                body: data,
            }),
        }),

        //ОТПРАВКА  ПО ПОЧТЕ ДОКУМЕНТОВ ПРИЛОЖЕННЫХ К ДОГОВОРУ
        sendAttachments: build.mutation({
            query: ({ data }) => ({
                url: `${CONTRACT_URL}/docs/send`,
                method: 'POST',
                body: data,
            }),
        }),

        //СКАЧИВАНИЕ ДОГОВОРА ДОКУМЕНТОМ
        downloadContract: build.mutation({
            query: ({ contractId }) => ({
                url: `${CONTRACT_URL}/download/${contractId}`,
                method: 'GET',
            }),
        }),

        //СКАЧИВАНИЕ ДОКУМЕНТА ПРИЛОЖЕННОГО К ДОГОВОРУ
        downloadAttachment: build.mutation({
            query: ({ attachmentId }) => ({
                url: `${CONTRACT_URL}/docs/${attachmentId}`,
                method: 'GET',
            }),
        }),
        //УДАЛЕНИЕ ДОКУМЕНТА ПРИЛОЖЕННОГО К ДОГОВОРУ
        deleteAttachment: build.mutation({
            query: ({ attachmentId }) => ({
                url: `${CONTRACT_URL}/docs/${attachmentId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetContractQuery,
    useCreateContractMutation,
    useDeleteContractMutation,
    useUnmarkOriginalContractMutation,
    useSignOriginalContractMutation,
    useSendOriginalContractMutation,
    useSendByEmailContractMutation,
    useSendAttachmentsMutation,
    useDownloadContractMutation,
    useDownloadAttachmentMutation,
    useDeleteAttachmentMutation,
} = contractApiActions;
