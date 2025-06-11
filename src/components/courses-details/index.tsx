
import BreadcrumbCoursesDetails from "../../common/breadcrumb/BreadcrumbCoursesDetails";
// import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
// import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import CoursesDetailsArea from "./CoursesDetailsArea";







const CoursesDetails = () => {
  return (
    <>
      {/* 
      <Preloader /> */}
      <HeaderOne />
      <BreadcrumbCoursesDetails />
      <CoursesDetailsArea />
      {/* <FooterOne /> */}
      <ScrollTop />
    </>
  );
};

export default CoursesDetails;