import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex flex-col justify-between lg:justify-center"
      style={{
        backgroundImage:
          "url('https://revus.tm-colors.info/dealer/wp-content/uploads/revslider/rewon-home-page-slider/auto-slide-2-min.png')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 py-20 md:py-32">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
          Premium Cars Dealers
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-8">
          Expert Auto Services
        </p>
        <button className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition">
          Learn More
        </button>
      </div>

      <div className="relative z-10 w-11/12 sm:w-10/12 lg:w-8/12 lg:mt-5  mx-auto mb-10 lg:mb-0 px-4 md:px-10 lg:px-20 py-6 bg-white shadow-lg rounded-lg lg:absolute lg:inset-0 lg:top-3/4 lg:transform lg:-translate-y-1/2 lg:translate-x-0">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-6 space-y-4 lg:space-y-0 w-full">
            <div className="w-full lg:w-auto">
              <label className="text-gray-700 font-medium">Select Make</label>
              <select className="mt-2 block w-full lg:w-48 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-300">
                <option>All Makes</option>
                <option value="">2020</option>
                <option value="">2021</option>
                <option value="">2022</option>
                <option value="">2023</option>
                <option value="">2024</option>
              </select>
            </div>
            <div className="w-full lg:w-auto">
              <label className="text-gray-700 font-medium">
                Select a Model
              </label>
              <select className="mt-2 block w-full lg:w-48 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-300">
                <option>All Models</option>
                <option value="">Electric</option>
                <option value="">EUV</option>
                <option value="">BMW</option>
              </select>
            </div>

            <div className="w-full lg:w-auto">
              <label className="text-gray-700 font-medium">Fuel Type</label>
              <select className="mt-2 block w-full lg:w-48 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-300">
                <option>All Fuel Types</option>
                <option value={""}>Gas</option>
                <option value={""}>Petrol</option>
                <option value={""}>Dissel</option>
              </select>
            </div>
          </div>
          <Link to="/all-cars">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1">
              Search
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
