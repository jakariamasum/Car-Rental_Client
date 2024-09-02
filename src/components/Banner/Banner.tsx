const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage:
          "url('https://revus.tm-colors.info/dealer/wp-content/uploads/revslider/rewon-home-page-slider/auto-slide-2-min.png')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Premium Cars Dealers
        </h1>
        <p className="text-lg md:text-xl mb-8">Expert Auto Services</p>
        <button className="bg-iindigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition">
          Learn More
        </button>
      </div>

      <div className="absolute w-9/12 mx-auto bottom-0 left-0 right-0 px-4 md:px-20 p-6 bg-white shadow-lg rounded-lg transform -translate-y-1/2">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6 space-y-4 md:space-y-0">
            <div className="w-full md:w-auto">
              <label className="text-gray-700 font-medium">Select Make</label>
              <select className="mt-2 block w-full md:w-48 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-300">
                <option>All Makes</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label className="text-gray-700 font-medium">
                Select a Model
              </label>
              <select className="mt-2 block w-full md:w-48 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-300">
                <option>All Models</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label className="text-gray-700 font-medium">
                Select Body Type
              </label>
              <select className="mt-2 block w-full md:w-48 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-300">
                <option>All Body Types</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label className="text-gray-700 font-medium">Fuel Type</label>
              <select className="mt-2 block w-full md:w-48 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-300">
                <option>All Fuel Types</option>
                <option>Options here</option>
              </select>
            </div>
          </div>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
