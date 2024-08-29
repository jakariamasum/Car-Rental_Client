import { baseApi } from "../../api/baseApi";

export const carsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useGetAllCarsQuery, useGetSingleCarQuery } = carsApi;
