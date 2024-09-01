import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 border-b-4 border-blue-200 pb-2">
          Terms of Service
        </h1>
        <p className="text-gray-700 mb-6">
          These terms of service govern your use of our website and services. By
          accessing or using our services, you agree to comply with these terms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          1. Use of Services
        </h2>
        <p className="text-gray-700 mb-4">
          You agree to use our services only for lawful purposes and in
          accordance with these terms. You are responsible for ensuring that
          your use complies with all applicable laws and regulations.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          2. User Accounts
        </h2>
        <p className="text-gray-700 mb-4">
          You may be required to create an account to use certain features of
          our services. You are responsible for maintaining the confidentiality
          of your account information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          3. Intellectual Property
        </h2>
        <p className="text-gray-700 mb-4">
          All content, trademarks, and other intellectual property on our
          website are owned by us or our licensors. You may not use them without
          our permission.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          4. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-4">
          We are not liable for any damages arising from your use of our
          services. This limitation of liability applies to the fullest extent
          permitted by law.
        </p>

        <p className="text-gray-700">
          If you have any questions about our terms of service, please{" "}
          <Link to="/contact" className="underline text-blue-500 mr-1">
            contact
          </Link>
          us.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
