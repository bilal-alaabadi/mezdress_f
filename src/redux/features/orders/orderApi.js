import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include'
    }),
    tagTypes: ["Order"],
    endpoints: (builder) => ({
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/${email}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                return response.orders.map(order => ({
                    ...order,
                    products: order.products.map(product => ({
                        ...product,
                        name: product.name || product.productId?.name || 'منتج غير محدد',
                        price: product.price || product.productId?.price || 0,
                        image: product.image || product.productId?.image || 'https://via.placeholder.com/150'
                    }))
                }));
            },
            providesTags: ['Order']
        }),
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `/order/${orderId}`,
                method: 'GET'
            }),
            providesTags: ['Order']
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: '',
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response.map(order => ({
                    ...order,
                    products: order.products.map(product => ({
                        ...product,
                        name: product.name || product.productId?.name || 'منتج غير محدد',
                        price: product.price || product.productId?.price || 0,
                        image: product.image || product.productId?.image || 'https://via.placeholder.com/150'
                    }))
                }));
            },
            providesTags: ['Order']
        }),
        updateOrderStatus: builder.mutation({
            query: ({id, status}) => ({
                url: `/update-order-status/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Order']
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/delete-order/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order']
        })
    })
})

export const {
    useGetOrdersByEmailQuery,
    useGetOrderByIdQuery,
    useGetAllOrdersQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation
} = orderApi;

export default orderApi;