
import Preloader from "../../../common/Preloader";
import ScrollTop from "../../../common/ScrollTop";
import FooterTwo from "../../../layouts/footers/FooterTwo";
import HeaderTwo from "../../../layouts/headers/HeaderTwo";
import BlogHomeTwo from "./BlogHomeTwo";
import CertificateHomeTwo from "./CertificateHomeTwo";
import ChooseHomeTwo from "./ChooseHomeTwo";
import CoursesHomeTwo from "./CoursesHomeTwo";
import FaqHomeTwo from "./FaqHomeTwo";
import HeroHomeTwo from "./HeroHomeTwo";
import PopularCoursesHomeTwo from "./PopularCoursesHomeTwo";
import TeamHomeTwo from "./TeamHomeTwo";
import TestimonialHomeTwo from "./TestimonialHomeTwo";
import TopCategoryHomeTwo from "./TopCategoryHomeTwo";



const HomeTwo = () => {
	return (
		<>
			<Preloader />
			<HeaderTwo />
			<HeroHomeTwo />
			<TopCategoryHomeTwo />
			<PopularCoursesHomeTwo />
			<ChooseHomeTwo />
			<TeamHomeTwo />
			<CertificateHomeTwo />
			<CoursesHomeTwo />
			<TestimonialHomeTwo />
			<FaqHomeTwo />
			<BlogHomeTwo />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default HomeTwo;
