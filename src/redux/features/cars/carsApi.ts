/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const carsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCars: builder.mutation({
      query: (data: any) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cars"],
    }),
    getAllCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
      providesTags: ["Cars"],
    }),
    getSingleCar: builder.query({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["Cars"],
    }),
    getCarsBySearch: builder.query({
      query: (searchTerm: string) => ({
        url: `/cars/search/${searchTerm}`,
        method: "GET",
      }),
      providesTags: ["Cars"],
    }),
    returnCar: builder.mutation({
      query: ({ id, data }: { id: string; data: { endTime: string } }) => ({
        url: `/cars/return/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cars"],
    }),
    updateCar: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cars"],
    }),
    deleteCar: builder.mutation({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useGetCarsBySearchQuery,
  useReturnCarMutation,
  useCreateCarsMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carsApi;
