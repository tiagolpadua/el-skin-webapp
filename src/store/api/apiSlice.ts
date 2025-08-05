import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '../../config/APIConfig';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags?: Array<{
    label: string;
    type: 'protection' | 'face';
  }>;
}

export interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Product', 'Carousel'],
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => API_CONFIG.ENDPOINTS.PRODUCTS,
      providesTags: ['Product'],
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => `${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    getCarouselItems: builder.query<ICarouselItem[], void>({
      query: () => API_CONFIG.ENDPOINTS.CAROUSEL,
      providesTags: ['Carousel'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCarouselItemsQuery,
} = apiSlice;