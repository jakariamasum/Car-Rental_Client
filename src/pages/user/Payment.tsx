/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  FaDollarSign,
  FaCreditCard,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { toast } from "sonner";

interface PaymentDetails {
  amount: number;
  status: string;
}

const Payment: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amount: 150,
    status: "returned",
  });
  const [isPaymentSuccessful, setIsPaymentSuccessful] =
    useState<boolean>(false);

  const handlePayment = () => {
    if (paymentDetails.status === "returned") {
      setIsPaymentSuccessful(true);
      toast.success("Payment processed successfully!");
    } else {
      toast.error(
        "Car not returned yet. Please return the car before making a payment."
      );
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
          Payment Management
        </h2>
        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <FaDollarSign className="text-blue-600 text-3xl" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                Total Amount Due
              </p>
              <p className="text-lg text-gray-600">
                ${paymentDetails.amount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <FaCreditCard className="text-gray-600 text-3xl" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                Payment Status
              </p>
              <p
                className={`text-lg ${
                  paymentDetails.status === "returned"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {paymentDetails.status === "returned"
                  ? "Car Returned"
                  : "Car Not Returned"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className={`w-full py-3 text-lg font-semibold rounded-lg shadow-md transition duration-300 ${
            paymentDetails.status === "returned"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={paymentDetails.status !== "returned"}
        >
          {paymentDetails.status === "returned" ? (
            "Pay Now"
          ) : (
            <span className="flex items-center justify-center">
              <FaExclamationTriangle className="text-red-500 text-xl mr-2" />
              Please Return Car First
            </span>
          )}
        </button>

        {isPaymentSuccessful && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-600 text-2xl mr-2" />
              <p className="text-lg font-semibold">
                Payment Completed Successfully!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
