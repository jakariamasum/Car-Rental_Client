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
    }),
    getAllCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
    }),
    getSingleCar: builder.query({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
    }),
    getCarsBySearch: builder.query({
      query: (searchTerm: string) => ({
        url: `/cars/search/${searchTerm}`,
        method: "GET",
      }),
    }),
    returnCar: builder.mutation({
      query: ({ id, data }: { id: string; data: { endTime: string } }) => ({
        url: `/cars/return/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateCar: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCar: builder.mutation({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
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
