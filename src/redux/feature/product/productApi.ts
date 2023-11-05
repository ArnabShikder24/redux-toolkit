import { api } from "@/redux/api/apiSlice";

const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
        }),
        getProduct: builder.query({
            query: (id) => `/product/${id}`,
        }),
        getComment: builder.query({
            query: (id) => `/comment/${id}`,
        }),
        postComment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/comment/${id}`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetCommentQuery,
    usePostCommentMutation
} = productApi;