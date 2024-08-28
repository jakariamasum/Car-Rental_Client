import {
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-2">
          <div className="w-full  mb-8">
            <h1 className="text-3xl font-bold">RideX</h1>
            <p className="mt-4 text-sm text-gray-300">
              Save big with our cheap car rental
            </p>
            <div className="flex mt-6 space-x-4">
              <FaTwitter className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-200" />
              <FaFacebook className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-200" />
              <FaPinterest className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-200" />
              <FaInstagram className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-200" />
            </div>
          </div>

          <div className="w-full mb-8">
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <p className="text-sm text-gray-300">
              66 Road NS Street, Kushtia, BD
            </p>
            <div className="flex items-center mt-4 text-gray-300">
              <FaEnvelope className="mr-2 text-lg" />
              <span>ridex@company.com</span>
            </div>
            <div className="flex items-center mt-2 text-gray-300">
              <FaPhone className="mr-2 text-lg" />
              <span>+111 000 1111</span>
            </div>
          </div>

          <div className="w-full  mb-8">
            <h2 className="text-lg font-semibold mb-4">Explore</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-red-500 transition-colors duration-200 cursor-pointer">
                About Us
              </li>
              <li className="hover:text-red-500 transition-colors duration-200 cursor-pointer">
                New Cars
              </li>
              <li className="hover:text-red-500 transition-colors duration-200 cursor-pointer">
                Latest News
              </li>
              <li className="hover:text-red-500 transition-colors duration-200 cursor-pointer">
                Contact
              </li>
              <li className="hover:text-red-500 transition-colors duration-200 cursor-pointer">
                Gallery
              </li>
            </ul>
          </div>

          <div className="w-full  mb-8">
            <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
            <p className="mb-4 text-sm text-gray-300">
              Subscribe to our newsletter to get our latest updates & news.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-2 rounded-l-md focus:outline-none text-gray-800"
              />
              <button className="bg-blue-500 p-2 rounded-r-md text-white hover:bg-red-500 transition-colors duration-200">
                <FaEnvelope />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-300">
          <p className="hover:text-red-500 text-[#4E6CFB] text-xl">
            Developed by Jakaria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
