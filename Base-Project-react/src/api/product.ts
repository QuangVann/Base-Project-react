import IProduct from '@/interfaces/product';
 import { pause } from '@/utils/pause';
 import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 
 const productApi = createApi({
     reducerPath: 'http://localhost:3000/products',
     tagTypes: ['Product'],
     baseQuery: fetchBaseQuery({
         baseUrl: import.meta.env.VITE_API_URL,
         fetchFn: async (...args) => {
             await pause(1000);
             return fetch(...args);
         }
     }),
     endpoints: (builder) => ({
         getProducts: builder.query<IProduct[], void>({
             query: () => `http://localhost:3000/products`,
             providesTags: ['Product']
         }),
         getProductById: builder.query<IProduct, number | string>({
             query: (id) => `http://localhost:3000/products/${id}`,
             providesTags: ['Product']
         }),
         removeProduct: builder.mutation<void, number>({
             query: (id) => ({
                 url: `  http://localhost:3000/products/${id}`,
                 method: "DELETE"
             }),
             invalidatesTags: ['Product']
         }),
         addProduct: builder.mutation<IProduct, IProduct>({
             query: (product) => ({
                 url: ` http://localhost:3000/products`,
                 method: "POST",
                 body: product
             }),
             invalidatesTags: ['Product']
         }),
         updateProduct: builder.mutation<IProduct, IProduct>({
             query: (product) => ({
                 url: `http://localhost:3000/products/${product.id}`,
                 method: "PATCH",
                 body: product
             }),
             invalidatesTags: ['Product']
         })
     })
 });
 
 export const {
     useGetProductsQuery,
     useGetProductByIdQuery,
     useRemoveProductMutation,
     useAddProductMutation,
     useUpdateProductMutation
 } = productApi;
 export const productReducer = productApi.reducer;
 export default productApi;