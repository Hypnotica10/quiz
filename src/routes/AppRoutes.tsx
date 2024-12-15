import { Route, Routes } from "react-router-dom";
import { Drawer, Layout, PrivateRoute, NotFound } from "../components";
import { useAuthContext } from "../context/AuthContext";
import {
  CopyCourse,
  Course,
  EditCourse,
  Flashcards,
  Home,
  Profile,
  SelfCourse,
  SetCourse,
  TestPreview,
  YourLibrary,
} from "../screen";
import React from "react";
import { useScrollToTop } from "../hooks/useScrollToTop";

const AppRoutes: React.FC = () => {
  const { state } = useAuthContext();
  useScrollToTop();

  return (
    //   <Routes>
    //       <Route path="/" element={<Layout />}>
    //         {/* public route */}
    //         <Route path="/" element={<Home />} />
    //         <Route path="/flashcards" element={<Flashcards />} />
    //         <Route path="/test" element={<TestPreview />} />

    //         {/* private route */}
    //         {/* <Route element={<PrivateRoute />}>
    //     <Route path="/languages"></Route>
    //   </Route> */}
    //         <Route
    //           path="/course/:courseId/:courseTitle"
    //           element={<PrivateRoute />}
    //         />
    //         <Route path="/user/:userId" element={<PrivateRoute />} />
    //         <Route path="/languages" element={<PrivateRoute />} />
    //         <Route path="/math" element={<PrivateRoute />} />
    //         <Route path="/science" element={<PrivateRoute />} />
    //         <Route path="/social-science" element={<PrivateRoute />} />
    //         <Route path="/other" element={<PrivateRoute />} />
    //         <Route path="/flashcards/set" element={<PrivateRoute />} />
    //         <Route path="/user/:userId/sets" element={<PrivateRoute />} />
    //         {/* not found route */}
    //         <Route path="*" element={<NotFound />} />
    //       </Route>
    //     </Routes>
    // </>
    <>
      <Routes>
        <Route path="/" element={state.authenticated ? <Drawer /> : <Layout />}>
          {/* public route */}
          <Route
            path="/quiz"
            element={state.authenticated ? <Course /> : <Home />}
          />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/test" element={<TestPreview />} />

          {/* private route */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/course/:courseId/:courseTitle"
              element={<SelfCourse />}
            />
            <Route path="/flashcards/sets" element={<SetCourse />} />
            <Route path="/flashcards/copy" element={<CopyCourse />} />
            <Route path="/flashcards/edit/:courseId" element={<EditCourse />} />
            <Route path="/user/:userId">
              <Route path="" element={<Profile />} />
              <Route path="sets" element={<YourLibrary />} />
            </Route>
          </Route>

          {/* not found route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
