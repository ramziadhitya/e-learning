import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./layouts/Wrapper";
import HomeTwo from "./components/homes/home-2";
import Courses from "./components/courses";
import CoursesDetails from "./components/courses-details";
import ShopGrid from "./components/shop-grid";
import Instructor from "./components/instructor";
import InstructorDetails from "./components/instructor-details";
import Gallery from "./components/gallery";
import Faq from "./components/faq";
import SignIn from "./components/sign-in";
import Register from "./components/register";
import NotFound from "./components/Error";
import Dashboard from "./components/dashboard/InstructorDashboard";


const router = createBrowserRouter([
  { path: "/", element: <HomeTwo /> },
  { path: "/home-2", element: <HomeTwo /> },
  { path: "/courses", element: <Courses /> },
  { path: "/courses-details/:slug", element: <CoursesDetails /> },
  { path: "/shop-grid", element: <ShopGrid /> },
  { path: "/instructor", element: <Instructor /> },
  { path: "/instructor-details", element: <InstructorDetails /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/faq", element: <Faq /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
