import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./layouts/Wrapper";
import HomeTwo from "./components/homes/home-2";
import Courses from "./components/courses";
import CoursesDetails from "./components/courses-details";

import Instructor from "./components/instructor";

import SignIn from "./components/sign-in";
import Register from "./components/register";

import InstructorDashboardLayout from "./components/dashboard/InstructorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/context/AuthContext";
import AddQuizForm from "./components/quiz/AddQuizForm";
import AddQuestionForm from "./components/quiz/AddQuestionForm";
import AddAnswerForm from "./components/quiz/AddAnswerForm";





const router = createBrowserRouter([
  { path: "/", element: <HomeTwo /> },
  { path: "/home-2", element: <HomeTwo /> },
  { path: "/courses", element: <Courses /> },
  { path: "/courses-details/:slug", element: <CoursesDetails /> },
  { path: "/instructor", element: <Instructor /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <InstructorDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "quiz", element: <AddQuizForm /> },
      { path: "question", element: <AddQuestionForm /> },
      { path: "answer", element: <AddAnswerForm /> },
    ],
  },

]);

function App() {
  return (
    <AuthProvider>
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    </AuthProvider>
  );
}

export default App;
