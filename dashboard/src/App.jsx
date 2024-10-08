import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/utils/Header";
import Askquestion from "./components/Students/questions/Askquestion";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/StudentPages/Dashboard";
import Courses from "./pages/StudentPages/Courses";
import Login from "./pages/Login";
import Settings from "./pages/StudentPages/Settings";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import Loading from "./components/utils/Loading.jsx";
import { useSelector } from "react-redux";
import CoursesContent from "./components/Students/Courses.jsx/CoursesContent";
import CourseLayout from "./components/Students/Layouts/CourseLayout";
import FreeCourses from "./pages/AdminPages/FreeCourses";
import PaidCourses from "./pages/AdminPages/PaidCourses";
import Mentors from "./pages/AdminPages/Mentors";
import Students from "./pages/AdminPages/Students";
import AllQueries from "./pages/AdminPages/AllQueries";
import CreateCourse from "./components/Admin/AddCourses";
import Questions from "./pages/StudentPages/Questions";

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);

  return (
    <div className="800px:flex h-screen">
      <div className="w-[330px]">
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>
      <div className="w-[100%] 800px:mt-0 1000px:h-[100%] h-auto 800px:min-h-screen bg-[#1A1A1A] p-1 800px:p-2 1000px:p-3 ">
        <div className="w-full h-full bg-[#FFFBF7] rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  const { data: userData, isLoading } = useLoadUserQuery({});
  const user = useSelector((state) => state.auth?.user);
  const [role, setRole] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update role based on user
  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  // console.log("userdata", userData);

  if (isLoading) {
    return <Loading />; // Render loading component while data is loading
  }

  return (
    <BrowserRouter>
      <div className="w-screen 2xl:max-w-[1650px] font-Unbounded m-auto">
        <Routes>
          {isLoggedIn ? (
            <>
              {role === "admin" ? (
                <Route path="/" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/admin/free-courses" element={<FreeCourses />} />
                  <Route path="/admin/paid-courses" element={<PaidCourses />} />
                  <Route path="/admin/mentors" element={<Mentors />} />
                  <Route path="/admin/students" element={<Students />} />
                  <Route path="/create/freeCourse" element={<CreateCourse />} />
                  <Route path="/create/paidCourse" element={<CreateCourse />} />
                  <Route path="/admin/queries" element={<AllQueries />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              ) : (
                <Route path="/" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/queries" element={<Questions />} />
                  <Route path="/askquestion/:id" element={<Askquestion />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              )}
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
          <Route path="/course" element={<CourseLayout />}>
            <Route path=":id" element={<CoursesContent />} />
            <Route
              path=":id/:moduleid/:contentid"
              element={<CoursesContent />}
            />
          </Route>

          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
