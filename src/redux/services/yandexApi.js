import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_YANDEX = process.env.REACT_APP_URL_YANDEX;
const URL_GEOCODE = process.env.REACT_APP_URL_GEOCODE;
const API_KEY_MAP = process.env.REACT_APP_API_KEY_MAP;
const API_KEY_GEOSADGEST = process.env.REACT_APP_API_KEY_GEOSADGEST;

export const yandexApi = createApi({
    reducerPath: 'yandexApi',

    baseQuery: fetchBaseQuery({
        baseUrl: '',
        credentials: 'omit', // === axios.withCredentials: false
    }),

    endpoints: (build) => ({
        getAddressSuggest: build.query({
            query: ({ query, defaultCordinate }) => {
                const [lat, lon] = defaultCordinate;

                return {
                    url: `${URL_YANDEX}v1/suggest`,
                    params: {
                        apikey: API_KEY_GEOSADGEST,
                        print_address: 1,
                        text: query,
                        results: 5,
                        lang: 'ru',
                        attrs: 'uri',
                        types: 'geo,street,district,locality,area,province,house,metro',
                        ll: `${lon},${lat}`,
                    },
                };
            },
        }),

        getAddressExact: build.query({
            query: (query) => ({
                url: `${URL_GEOCODE}1.x/`,
                params: {
                    apikey: API_KEY_MAP,
                    geocode: query,
                    rspn: 0,
                    results: 1,
                    format: 'json',
                },
            }),
        }),
    }),
});

export const { useGetAddressSuggestQuery, useGetAddressExactQuery } = yandexApi;
