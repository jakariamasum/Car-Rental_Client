import { baseApi } from "../../api/baseApi";

export const carsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCarsQuery } = carsApi;
