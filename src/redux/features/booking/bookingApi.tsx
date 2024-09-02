/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

type TBooking = {
  car: string;
  user: string;
  status?: string;
  date: any;
  startTime?: string;
};
const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data: TBooking) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    getUserBookings: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }: { id: string; data: Partial<TBooking> }) => ({
        url: `/bookings/my-bookings/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    confirmBooking: builder.mutation({
      query: ({ id, data }: { id: string; data: Partial<TBooking> }) => ({
        url: `/bookings/confirm-booking/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (id: string) => ({
        url: `/bookings/my-bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useCreateBookingMutation,
  useGetUserBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useConfirmBookingMutation,
} = bookingApi;
