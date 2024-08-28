import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className=" text-center py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700">
            About Us
          </h1>
          <p className="mt-4 text-lg leading-relaxed">
            Learn more about our company, our team, and our commitment to
            service.
          </p>
        </div>
      </header>

      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">
          Company History
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Founded in 2010, RideX has been a leader in the car rental industry.
          Our mission is to provide top-quality car rental services with a focus
          on customer satisfaction, safety, and sustainability.
        </p>
        <p className="text-lg leading-relaxed">
          Our vision is to make car rental accessible, affordable, and
          convenient for everyone, while maintaining our commitment to reducing
          our carbon footprint.
        </p>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://i.ibb.co/k2wDxWP/foto-sushi-6anudmp-ILw4-unsplash.jpg"
                alt="John Doe"
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-600">
                John Doe
              </h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="text-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://i.ibb.co/k2wDxWP/foto-sushi-6anudmp-ILw4-unsplash.jpg"
                alt="Jane Smith"
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-600">
                Jane Smith
              </h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
            <div className="text-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://i.ibb.co/k2wDxWP/foto-sushi-6anudmp-ILw4-unsplash.jpg"
                alt="Michael Brown"
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-600">
                Michael Brown
              </h3>
              <p className="text-gray-600">Marketing Manager</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">Our Fleet</h2>
        <p className="text-lg leading-relaxed mb-4">
          We offer a diverse range of vehicles to suit all your needs, from
          economy cars for everyday use to luxury vehicles for special
          occasions. Our fleet includes sedans, SUVs, hybrids, and more.
        </p>
      </section>

      <section className="bg-gray-300 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">
            Values & Commitment
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            At RideX, we are committed to providing exceptional customer
            service, promoting sustainability, and continually improving our
            offerings to meet our customers' needs.
          </p>
          <p className="text-lg leading-relaxed">
            We believe in transparency, integrity, and respect, and we strive to
            uphold these values in all our interactions with customers,
            employees, and partners.
          </p>
        </div>
      </section>

      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">
          Contact Information
        </h2>
        <div className="flex flex-col">
          <div className="mb-6 md:mb-0">
            <p className="text-lg">
              <strong>Phone:</strong> +111 000 1111
            </p>
            <p className="text-lg">
              <strong>Email:</strong> ridex@company.com
            </p>
          </div>
          <div>
            <p className="text-lg">
              <strong>Address:</strong> 66 Road NS Street, Kushtia, BD
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
