import { useState } from "react";

const Offers = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      title: "Auto Financing",
      icon: "🚗",
      description:
        "Morbi aliquam montes, volutpat semper pretium penatibus vel varius scelerisque curabitur aptent tincidunt.",
      details: [
        "Quick Set-up Facility",
        "Pay After Approval",
        "Experienced Team",
      ],
      image:
        "https://i.ibb.co/MGhT0ds/tim-mossholder-V37i-Tr-YZz2-E-unsplash.jpg",
    },
    {
      id: 1,
      title: "Vehicle Trade-In",
      icon: "🔄",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      details: ["Easy Trade-In Process", "Best Value Offers", "Flexible Terms"],
      image:
        "https://i.ibb.co/MGhT0ds/tim-mossholder-V37i-Tr-YZz2-E-unsplash.jpg",
    },
    {
      id: 2,
      title: "Parts Repairing",
      icon: "⚙️",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.",
      details: ["Certified Technicians", "Genuine Parts", "Fast Service"],
      image:
        "https://i.ibb.co/MGhT0ds/tim-mossholder-V37i-Tr-YZz2-E-unsplash.jpg",
    },
    {
      id: 3,
      title: "Car Inspection",
      icon: "🔍",
      description:
        "Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit.",
      details: [
        "Comprehensive Inspection",
        "Detailed Report",
        "Affordable Rates",
      ],
      image:
        "https://i.ibb.co/MGhT0ds/tim-mossholder-V37i-Tr-YZz2-E-unsplash.jpg",
    },
    {
      id: 4,
      title: "Auto Painting",
      icon: "🎨",
      description:
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
      details: ["Quality Paint Jobs", "Color Matching", "Scratch Repair"],
      image:
        "https://i.ibb.co/MGhT0ds/tim-mossholder-V37i-Tr-YZz2-E-unsplash.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Services We <span className="text-red-600">Offer</span>
        </h2>
        <div className="flex flex-col  justify-center items-center">
          <div className="flex flex-wrap justify-center md:justify-start mb-4 ">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`cursor-pointer p-4 text-center border ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-800"
                } hover:bg-red-600 hover:text-white transition-colors`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="text-2xl">{tab.icon}</div>
                <div className="mt-2">{tab.title}</div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-2/3 p-4 bg-white shadow-lg rounded-md">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-3/5">
                <img
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].title}
                  className="rounded-md mb-4 "
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-6">
                <h3 className="text-2xl font-semibold mb-4">
                  {tabs[activeTab].title}
                </h3>
                <p className="mb-4">{tabs[activeTab].description}</p>
                <ul className="list-disc list-inside space-y-2">
                  {tabs[activeTab].details.map((detail, index) => (
                    <li key={index} className="text-gray-700">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
