import { UpdateProfileInputs } from "../../../pages/user/UpdateProfile";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signin",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/auth`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/auth/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    updateUser: builder.mutation<
      UpdateProfileInputs,
      { id: string; data: Partial<UpdateProfileInputs> }
    >({
      query: ({ id, data }) => ({
        url: `/auth/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetSingleUserQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} = authApi;
