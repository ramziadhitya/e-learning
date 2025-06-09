import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import BreadcrumbCoursesDetails from "../../common/breadcrumb/BreadcrumbCoursesDetails";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import CoursesDetailsArea from "./CoursesDetailsArea";

const API_URL = import.meta.env.VITE_API_URL;

const CoursesDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const query = qs.stringify(
      {
        filters: { slug: { $eq: slug } },
        populate: {
          video: true,
          thumbnail: true,
          instructor: true,
          quizzes: {
            populate: {
              questions: {
                populate: { answers: true },
              },
            },
          },
        },
      },
      { encodeValuesOnly: true }
    );

    axios
      .get(`${API_URL}/api/courses?${query}`)
      .then((res) => {
        const raw = res.data.data?.[0];
        if (raw) setCourse(raw);
      })
      .catch((err) => console.error("Error loading course:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Preloader />;

  if (!course) return <div className="text-center py-5">Course not found</div>;

  return (
    <>
      <HeaderOne />
      <BreadcrumbCoursesDetails />
      <CoursesDetailsArea data={course} />
      <FooterOne />
      <ScrollTop />
    </>
  );
};

export default CoursesDetails;
