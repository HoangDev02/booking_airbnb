import Category from "../../components/category/Category";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./home.css";

const Home = () => {
  return (
    <div>
      <div>
        <Header />
        <div className="flex flex-col align-middle gap-8 mt-[4rem]">
          <Category />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
