import React, { MouseEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon, Image } from "../components";
import { useAuthContext } from "../context/AuthContext";
import { generateSlug } from "../helper/formatString";
import { handleToast } from "../helper/handleToastify";
import {
  deleteCourseByCourseId,
  getCourseByUserId,
} from "../service/courseService";
import { ICourse } from "../types/course";
import { getUserById } from "../service/userService";
import { IInformationUser } from "../types/user";

const YourLibrary: React.FC = () => {
  const { state } = useAuthContext();
  const [listCourse, setListCourse] = useState<ICourse[]>([]);
  const [informationUser, setInformationUser] = useState<IInformationUser>({
    id: undefined,
    username: "",
    email: "",
    name: "",
    avatar: "",
  });
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    let id: number;
    if (userId !== state?.user?.id?.toString()) {
      id = parseInt(userId || "");
    } else {
      id = state?.user?.id || 0;
    }
    const getData = async (userId: number) => {
      if (isNaN(userId) || userId === 0) {
        handleToast("Invalid user Id", "error");
        navigate("/quiz");
        return;
      }
      try {
        const accessToken = localStorage.getItem("access_token") || "";
        const resJsonListCourse = await getCourseByUserId(
          `/course/user/${userId}`,
          accessToken
        );
        const resJsonInformationUser = await getUserById(
          `/users/${userId}`,
          accessToken
        );
        const dataListCourse = await resJsonListCourse?.data;
        const dataInformationUser = await resJsonInformationUser?.data;
        if (dataListCourse && dataInformationUser) {
          setListCourse(dataListCourse);
          setInformationUser(dataInformationUser);
          return;
        }
        handleToast("Server error", "error");
      } catch (error) {
        console.log(error);
      }
    };
    getData(id);
  }, []);

  const handleDeleteCourse = async (
    _e: MouseEvent<HTMLDivElement>,
    courseId: number = 0
  ) => {
    const accessToken = localStorage.getItem("access_token") || "";
    try {
      const resJsonDelete = await deleteCourseByCourseId(
        `/course/${courseId}`,
        accessToken
      );
      if (resJsonDelete.statusCode === 200) {
        handleToast(resJsonDelete?.message, "success");
        try {
          const resJsonListCourse = await getCourseByUserId(
            `/course/user/${state?.user?.id}`,
            accessToken
          );
          const data = await resJsonListCourse?.data;
          if (data) {
            setListCourse(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-large">
      <div className="mt-xl mb-40">
        <div className="flex flex-col gap-large">
          {userId !== (state?.user?.id || 0).toString() ? (
            <div className="flex items-center gap-medium">
              <div className="w-16 h-16 rounded-full">
                <Image
                  imageName={`${informationUser.avatar}`}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="">
                <span className="text-gray-800 font-semibold text-medium">
                  {informationUser.name}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-gray-800 font-semibold text-medium pointer-events-none">
              Your sets
            </span>
          )}

          <div className="flex flex-col gap-medium">
            {listCourse.length > 0 ? (
              listCourse.map((course: ICourse) => (
                <div
                  key={course.id}
                  className="bg-gray-100 cursor-pointer py-small px-medium shadow-base rounded-small flex items-center justify-between"
                >
                  <div className="flex-grow flex-shrink-0">
                    <Link
                      to={`/course/${course.id}/${generateSlug(course?.title)}${
                        course?.description
                          ? "-" + generateSlug(course?.description)
                          : ""
                      }`}
                    >
                      <div className="">
                        <div className="font-semibold text-xs text-gray-800">
                          <span>{course.countSentence} Terms</span>
                        </div>
                        <div className="mt-1 flex flex-col">
                          <span className="text-gray-800 font-bold text-small truncate">
                            {course.title}
                          </span>
                          <span className="text-gray-500 font-semibold text-base truncate">
                            {course.description}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {state?.user?.id?.toString() === userId ? (
                    <div
                      onClick={(e) => handleDeleteCourse(e, course.id)}
                      className="w-10 h-10 cursor-pointer p-xsmall text-gray-100 bg-error-200 rounded-medium"
                    >
                      <Icon iconName="trash" />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourLibrary;
