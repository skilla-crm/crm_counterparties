import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_YANDEX = process.env.REACT_APP_URL_YANDEX; // например https://suggest-maps.yandex.net/
const URL_GEOCODE = process.env.REACT_APP_URL_GEOCODE; // https://geocode-maps.yandex.ru/
const API_KEY_MAP = process.env.REACT_APP_API_KEY_MAP;
const API_KEY_GEOSADGEST = process.env.REACT_APP_API_KEY_GEOSADGEST;

export const yandexApi = createApi({
    reducerPath: 'yandexApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
    }),
    endpoints: (build) => ({
        getAddressSuggest: build.query({
            query: ({ query, defaultCordinate }) => {
                const [lat, lng] = defaultCordinate;

                return {
                    url: `${URL_YANDEX}v1/suggest`,
                    method: 'GET',
                    params: {
                        apikey: API_KEY_GEOSADGEST,
                        print_address: 1,
                        text: query,
                        results: 5,
                        lang: 'ru',
                        attrs: 'uri',
                        types: 'geo,street,district,locality,area,province,house,metro',
                        ll: `${lng},${lat}`,
                    },
                };
            },
        }),

        getAddressExact: build.query({
            query: (query) => ({
                url: `${URL_GEOCODE}1.x/`,
                method: 'GET',
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

export const { useGetAddressSuggestQuery, useLazyGetAddressExactQuery } =
    yandexApi;
