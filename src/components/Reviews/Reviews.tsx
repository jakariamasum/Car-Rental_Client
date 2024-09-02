import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Jessica Brown",
    role: "Customer",
    review:
      "I was very impressed by the service. The process was easy and efficient.",
    image:
      "https://i.ibb.co/nfTLk9q/photo-1560250097-0b93528c311a-q-80-w-1887-auto-format-fit-crop-ixlib-rb-4-0.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Kevin Martin",
    role: "Customer",
    review:
      "The team was extremely helpful and the service exceeded my expectations.",
    image:
      "https://i.ibb.co/nfTLk9q/photo-1560250097-0b93528c311a-q-80-w-1887-auto-format-fit-crop-ixlib-rb-4-0.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Jessica Brown",
    role: "Customer",
    review:
      "I was very impressed by the service. The process was easy and efficient.",
    image:
      "https://i.ibb.co/nfTLk9q/photo-1560250097-0b93528c311a-q-80-w-1887-auto-format-fit-crop-ixlib-rb-4-0.jpg",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-2">
        What Our <span className="text-indigo-600">Customers Say</span>
      </h2>
      <p className="text-center mb-16">
        Discover the success stories that speak louder than words! Hear
        firsthand from our delighted users about their experiences.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className={`max-w-sm p-6 border rounded-lg shadow-lg flex flex-col items-center text-center relative ${
              index % 2 == 0
                ? "bg-[#EEF0F2] border-transparent"
                : "bg-white border-gray-400"
            }`}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-gray-300 rounded-full p-3">
              <FaQuoteLeft className="text-blue-500 text-3xl" />
            </div>
            <p className="text-gray-700 italic mt-10 mb-4">{review.review}</p>
            <div className="flex justify-center mb-4">
              {Array(review.rating)
                .fill(0)
                .map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-16 h-16 rounded-full border-4 border-gray-300 mb-4"
                src={review.image}
                alt={review.name}
              />
              <div>
                <h4 className="text-lg font-semibold">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
