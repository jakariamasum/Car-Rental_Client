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
    getUserBookings: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }: { id: string; data: Partial<TBooking> }) => ({
        url: `/bookings/my-bookings/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBooking: builder.mutation({
      query: (id: string) => ({
        url: `/bookings/my-bookings/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useCreateBookingMutation,
  useGetUserBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
