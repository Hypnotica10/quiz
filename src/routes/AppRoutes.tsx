import { Route, Routes } from "react-router-dom";
import { Drawer, Layout, PrivateRoute, NotFound } from "../components";
import { useAuthContext } from "../context/AuthContext";
import {
  Course,
  Flashcards,
  Home,
  Profile,
  SelfCourse,
  SetFlashCards,
  Test,
} from "../screen";
import React from "react";

const AppRoutes: React.FC = () => {
  const { state } = useAuthContext();
  return (
    <>
      {state.authenticated ? (
        <Routes>
          <Route path="/" element={<Drawer />}>
            <Route path="/" element={<Course />} />

            {/*not found route*/}
            <Route path="*" element={<NotFound />} />

            <Route path="/course">
              <Route path=":courseId/:courseTitle" element={<SelfCourse />} />
            </Route>

            <Route path="/flashcards/set" element={<SetFlashCards />} />

            <Route path="/user">
              <Route path=":userId" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public route */}
            <Route path="/" element={<Home />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/test" element={<Test />} />

            {/* private route */}
            {/* <Route element={<PrivateRoute />}>
        <Route path="/languages"></Route>
      </Route> */}
            <Route
              path="/course/:courseId/:courseTitle"
              element={<PrivateRoute />}
            />
            <Route path="/user/:userId" element={<PrivateRoute />} />
            <Route path="/languages" element={<PrivateRoute />} />
            <Route path="/math" element={<PrivateRoute />} />
            <Route path="/science" element={<PrivateRoute />} />
            <Route path="/social-science" element={<PrivateRoute />} />
            <Route path="/other" element={<PrivateRoute />} />
            <Route path="/flashcards/set" element={<PrivateRoute />} />

            {/* not found route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
