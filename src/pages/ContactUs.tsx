const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <header className="bg-white py-12 shadow-md">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
            Get in Touch with Us
          </h1>
          <p className="text-lg text-gray-600">
            Whether you have a question, feedback, or just want to say hello,
            our team is here to help you. Fill out the form below, and we will
            get back to you as soon as possible.
          </p>
        </div>
      </header>

      <div className="flex items-center justify-center py-16 px-6">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Contact Us
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
