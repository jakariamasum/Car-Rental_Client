import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 border-b-4 border-blue-200 pb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-700 mb-6">
          Your privacy is important to us. This privacy policy explains the
          types of personal information we collect and how we use, disclose, and
          protect that information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 mb-4">
          We collect information directly from you, such as your name, email
          address, and other contact information. We also collect information
          about your usage of our services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-4">
          We use your information to provide, improve, and promote our services,
          communicate with you, and comply with legal obligations.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          3. Data Security
        </h2>
        <p className="text-gray-700 mb-4">
          We take appropriate measures to protect your information from
          unauthorized access, disclosure, or misuse.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          4. Changes to This Policy
        </h2>
        <p className="text-gray-700 mb-4">
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new policy on our website.
        </p>

        <p className="text-gray-700">
          If you have any questions about our privacy policy, please{" "}
          <Link to="/contact" className="underline text-blue-500 mr-1">
            contact
          </Link>{" "}
          us.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
