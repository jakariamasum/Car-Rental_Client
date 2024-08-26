import { FaThumbsUp, FaAward, FaHeadset, FaLock } from "react-icons/fa";

const reasons = [
  {
    id: 1,
    icon: <FaThumbsUp className="text-5xl text-red-500 mb-4" />,
    title: "High Quality Service",
    description:
      "We provide the best quality service that meets all customer requirements.",
  },
  {
    id: 2,
    icon: <FaAward className="text-5xl text-red-500 mb-4" />,
    title: "Award Winning Company",
    description:
      "Our company has won numerous awards for its exceptional service and quality.",
  },
  {
    id: 3,
    icon: <FaHeadset className="text-5xl text-red-500 mb-4" />,
    title: "24/7 Customer Support",
    description:
      "Our customer support is available 24/7 to assist you with any inquiries.",
  },
  {
    id: 4,
    icon: <FaLock className="text-5xl text-red-500 mb-4" />,
    title: "Secure Payments",
    description:
      "We ensure all your transactions are secure and your data is protected.",
  },
];

const ChooseUs = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
        Why <span className="text-red-500">Choose</span> Us
      </h2>
      <p className="text-center mb-12">
        Lorem ipsum dolor sit amet nsectetur cing elituspe ndisse suscipit
        sagitis leo sit.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {reasons.map((reason) => (
          <div
            key={reason.id}
            className="max-w-xs p-8 bg-white border border-gray-100 rounded-lg shadow-lg text-center hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <div className="flex justify-center">{reason.icon}</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              {reason.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUs;
