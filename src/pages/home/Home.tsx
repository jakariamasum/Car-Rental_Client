import Banner from "../../components/Banner/Banner";
import ChooseUs from "../../components/chooseUs/ChooseUs";
import Featured from "../../components/featured/Featured";
import Offers from "../../components/Offers/Offers";
import Reviews from "../../components/Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <Offers />
      <Featured />
      <Reviews />
      <ChooseUs />
    </div>
  );
};

export default Home;
