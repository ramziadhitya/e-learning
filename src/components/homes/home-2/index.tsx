
import Preloader from "../../../common/Preloader";
import ScrollTop from "../../../common/ScrollTop";
import FooterTwo from "../../../layouts/footers/FooterTwo";
import HeaderTwo from "../../../layouts/headers/HeaderTwo";
import CertificateHomeTwo from "./CertificateHomeTwo";
import ChooseHomeTwo from "./ChooseHomeTwo";
import FaqHomeTwo from "./FaqHomeTwo";
import HeroHomeTwo from "./HeroHomeTwo";
import TopCategoryHomeTwo from "./TopCategoryHomeTwo";



const HomeTwo = () => {
	return (
		<>
			<Preloader />
			<HeaderTwo />
			<HeroHomeTwo />
			<TopCategoryHomeTwo />
			<ChooseHomeTwo />
			<CertificateHomeTwo />
			<FaqHomeTwo />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default HomeTwo;
