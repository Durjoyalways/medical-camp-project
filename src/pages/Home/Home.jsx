import Banner from "../../components/Home/Banner";
import PopularCamps from "../../components/Home/PopularCamps";
import Feedback from "../../components/Home/Feedback";
import SpecialSection from "../../components/Home/SpecialSection";

const Home = () => {
    return (
        <div>
            <Banner />
            <PopularCamps />
            <Feedback />
            <SpecialSection />
        </div>
    );
};

export default Home;