import CarCard from "../cardCard/CarCard";

const cars = [
  {
    id: 1,
    image:
      "https://i.ibb.co/PtPmWcD/photo-1519641471654-76ce0107ad1b-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
    name: "Peugeot 508 Sports",
    year: "2019",
    mileage: "2000",
    fuelType: "Petrol+CNG",
    transmission: "Manual",
    price: 44,
  },
  {
    id: 2,
    image:
      "https://i.ibb.co/PtPmWcD/photo-1519641471654-76ce0107ad1b-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
    name: "Toyota Corolla",
    year: "2021",
    mileage: "1500",
    fuelType: "Petrol",
    transmission: "Automatic",
    price: 50,
  },
  {
    id: 3,
    image:
      "https://i.ibb.co/PtPmWcD/photo-1519641471654-76ce0107ad1b-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
    name: "Honda Civic",
    year: "2020",
    mileage: "1800",
    fuelType: "Petrol",
    transmission: "Manual",
    price: 48,
  },
  {
    id: 4,
    image:
      "https://i.ibb.co/PtPmWcD/photo-1519641471654-76ce0107ad1b-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
    name: "Space X",
    year: "2020",
    mileage: "1800",
    fuelType: "Petrol",
    transmission: "Manual",
    price: 48,
  },
];

const Featured = () => {
  return (
    <div className=" flex flex-col justify-center items-center gap-4 container mx-auto p-5">
      <h2 className="text-3xl md:text-5xl capitalize  font-semibold text-center">
        Latest <span className="text-red-500">Cars</span>
      </h2>
      <p className="text-center ">
        A friendly collection for you. You can have a look and choose the best
        for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-full mt-10">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
