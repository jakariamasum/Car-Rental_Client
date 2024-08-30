import { baseApi } from "../../api/baseApi";

type TBooking = {
  car: string;
  user: string;
  startTime: string;
  date: string;
};
const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data: TBooking) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBookingsQuery, useCreateBookingMutation } = bookingApi;
