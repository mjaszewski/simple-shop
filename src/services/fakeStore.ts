import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '../types'

type ProductsResponse = Product[]

export const fakeStoreApi = createApi({
  reducerPath: 'fakeStoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => '/products',
    }),
  }),
})

export const { useGetProductsQuery } = fakeStoreApi
