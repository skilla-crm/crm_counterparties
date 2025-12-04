import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = document
  .getElementById("root_counterparties")
  ?.getAttribute("token");

const CONTRACT_URL = "/company-contracts";

export const contractApiActions = createApi({
  reducerPath: "contractApiActions",
  tagTypes: ["contract"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      if (token) headers.set("Authorization", token);
      headers.set("Accept", "application/json");
      //   headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (build) => ({
    //ДЕТАЛКА ДОГОВОРА
    getContract: build.query({
      query: ({ contractId }) => ({
        url: `${CONTRACT_URL}/${contractId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["contract"],
    }),

    //СОЗДАНИЕ ДОГОВОРА
    createContract: build.mutation({
      query: ({ data }) => ({
        url: `${CONTRACT_URL}`,
        method: "POST",
        body: data,
        // body: JSON.stringify(data),
      }),
      invalidatesTags: ["contract"],
    }),

    //РЕДАКТИРОВАНИЕ ДОГОВОРА
    updateContract: build.mutation({
      query: ({ contractId, data }) => ({
        url: `${CONTRACT_URL}/${contractId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contract"],
    }),
    // УДАЛЕНИЕ ДОГОВОРА
    deleteContract: build.mutation({
      query: ({ contractId }) => ({
        url: `${CONTRACT_URL}/${contractId}`,
        method: "DELETE",
      }),
    }),
    //СНЯТЬ ОТМЕКУ О ПОДПИСАИИ С ОРИГИНАЛА
    unmarkOriginalContract: build.mutation({
      query: ({ id, data }) => ({
        url: `${CONTRACT_URL}/unmark/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contract"],
    }),
    //ПОДПИСАНИЕ ОРИГИНАЛА ДОГОВОРА
    signOriginalContract: build.mutation({
      query: ({ id, data }) => ({
        url: `${CONTRACT_URL}/sign_original/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contract"],
    }),

    //ОТПРАВКА ОРИГИНАЛА ДОГОВОРА
    sendOriginalContract: build.mutation({
      query: ({ id, data }) => ({
        url: `${CONTRACT_URL}/send_original/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contract"],
    }),
    //ОТПРАВКА ДОГОВОРА ПО ПОЧТЕ
    sendByEmailContract: build.mutation({
      query: ({ data }) => ({
        url: `${CONTRACT_URL}/send`,
        method: "POST",
        body: data,
      }),
    }),

    //ОТПРАВКА ПО ПОЧТЕ ДОКУМЕНТОВ ПРИЛОЖЕННЫХ К ДОГОВОРУ
    sendAttachments: build.mutation({
      query: ({ data }) => ({
        url: `${CONTRACT_URL}/docs/send`,
        method: "POST",
        body: data,
      }),
    }),
    //ДОБАВЛЕНИЕ ДОКУМЕНТОВ ПРИЛОЖЕННЫХ К ДОГОВОРУ
    addAttachments: build.mutation({
      query: ({ data }) => ({
        url: `${CONTRACT_URL}/docs/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contract"],
    }),

    //СКАЧИВАНИЕ ДОГОВОРА ДОКУМЕНТОМ
    downloadContract: build.mutation({
      query: ({ contractId, data }) => ({
        url: `${CONTRACT_URL}/download/${contractId}`,
        method: "POST",
        body: data,
        responseHandler: (response) => response.blob(),
      }),
    }),

    //СКАЧИВАНИЕ ДОКУМЕНТА ПРИЛОЖЕННОГО К ДОГОВОРУ
    downloadAttachment: build.mutation({
      query: ({ attachmentId }) => ({
        url: `${CONTRACT_URL}/docs/${attachmentId}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),
    //УДАЛЕНИЕ ДОКУМЕНТА ПРИЛОЖЕННОГО К ДОГОВОРУ

    deleteAttachment: build.mutation({
      query: ({ attachmentId }) => ({
        url: `${CONTRACT_URL}/docs/${attachmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contract"],
    }),

    //НАСТРОЙКИ
    getSettings: build.query({
      query: ({ companyId }) => ({
        url: `/counterparties/parameters/${companyId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 300,
      transformResponse: (response) => response.data,
      providesTags: ["contract"]
    }),
  }),
});

export const {
  useGetContractQuery,
  useUpdateContractMutation,
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
  useGetSettingsQuery,
  useAddAttachmentsMutation,
} = contractApiActions;
