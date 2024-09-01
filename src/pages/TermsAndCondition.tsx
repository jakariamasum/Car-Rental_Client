import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 border-b-4 border-blue-200 pb-3">
          Terms and Conditions
        </h1>
        <p className="text-gray-700 mb-6">
          These terms and conditions outline the rules and regulations for the
          use of our website and services. By accessing this website, we assume
          you accept these terms and conditions. Do not continue to use the
          website if you do not agree to all of the terms and conditions stated
          on this page.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">
          1. License
        </h2>
        <p className="text-gray-700 mb-4">
          Unless otherwise stated, we and/or our licensors own the intellectual
          property rights for all material on this website. All intellectual
          property rights are reserved. You may access this from the website for
          your own personal use subject to restrictions set in these terms and
          conditions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">
          2. User Comments
        </h2>
        <p className="text-gray-700 mb-4">
          Parts of this website offer an opportunity for users to post and
          exchange opinions and information. We do not filter, edit, publish or
          review Comments prior to their presence on the website. Comments do
          not reflect our views or those of our affiliates.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">
          3. Hyperlinking to Our Content
        </h2>
        <p className="text-gray-700 mb-4">
          Organizations may link to our website without prior written approval,
          as long as the link is not in any way misleading, does not falsely
          imply sponsorship, endorsement, or approval of the linking party and
          its products or services, and fits within the context of the linking
          party’s site.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">
          4. Content Liability
        </h2>
        <p className="text-gray-700 mb-4">
          We shall not be hold responsible for any content that appears on your
          website. You agree to protect and defend us against all claims that
          are rising on your website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">
          5. Reservation of Rights
        </h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to request that you remove all links or any
          particular link to our website. You approve to immediately remove all
          links to our website upon request.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">
          6. Removal of Links from Our Website
        </h2>
        <p className="text-gray-700 mb-4">
          If you find any link on our website that is offensive for any reason,
          you are free to contact and inform us any moment. We will consider
          requests to remove links but we are not obligated to or so or to
          respond to you directly.
        </p>

        <p className="text-gray-700 mt-6">
          If you have any questions about our terms and conditions, please feel
          free to{" "}
          <Link to="/contact" className="underline text-blue-500 mr-1">
            contact
          </Link>{" "}
          us.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
