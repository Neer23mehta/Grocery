import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: 'api',
    keepUnusedDataFor:10,
    refetchOnFocus:true,
    refetchOnReconnect:true,
    baseQuery: fetchBaseQuery({baseUrl:'http://192.168.2.163:3001/admin/'}),
    tagTypes: ['User',"Terms","Advertise"],
    endpoints: (builder) => {
        return {
            getAllTandC: builder.query({
                query: () => "get_terms_conditions",
                providesTags: ["Terms"],
            }),
            addTandC: builder.mutation({
                query: (formData) => {
                    return {
                        url: "terms_and_condition",
                        method: "POST",
                        body: formData,
                    }
                },
                // providesTags: ['Terms'],
                invalidatesTags: ['Terms']
            }),
            deleteTandC: builder.mutation({
                query: ({ id, language }) => ({
                    url: `delete_terms_condition?id=${id}&language=${language}`,
                    method: "DELETE",
                }),
                invalidatesTags: ['Terms']
            }),
            getAllUsers: builder.query({
                query: () => {
                    return {
                        url: "getusers",
                    }
                },
                providesTags: ["User"],
            }),
            deleteUser: builder.mutation({
                query: ({ id }) => {
                    return { 
                        url: `deleteuser?id=${id}`,
                    }
                },
                invalidatesTags: ['User'],
                async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                    const result = dispatch(
                        apiSlice.util.updateQueryData("getAllUsers",undefined,(draft) => {
                            return draft.filter(item => item.id !== arg.id);
                        })
                    );
                    try {
                        await queryFulfilled;
                    } catch (error) {
                        result.undo()
                    }
                }
            }),
            getAllAdvertise: builder.query({
                query: () => "get_all_home_management?fkSectionId=4",
                providesTags: ["Advertise"],
            })            
        }
    }
})

export default apiSlice;  
export const {useGetAllTandCQuery, useAddTandCMutation, useDeleteTandCMutation,useGetAllAdvertiseQuery} = apiSlice;  