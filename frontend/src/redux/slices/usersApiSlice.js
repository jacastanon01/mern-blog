import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({               
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST"
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: USERS_URL,
                method: "POST",
                body: data
            })
        }),
        getProfile: builder.query({
            query: () => `${USERS_URL}/profile`,
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data
            })
        })
    })
})

// Common convention to export injected endpoints is to label it as use<builderName><method> eg useLoginQuery or useLoginMutation

export const { useLoginMutation, useGetProfileQuery, useUpdateProfileMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice