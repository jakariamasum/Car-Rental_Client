import Banner from "../../components/Banner/Banner";
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
    </div>
  );
};

export default Home;
