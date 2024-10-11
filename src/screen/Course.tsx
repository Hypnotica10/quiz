import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, TabScroll } from "../components";
import { generateSlug } from "../helper/formatString";
import { getRandomNineCourse } from "../service/courseService";
import { ICourse } from "../types/course";

const Course: React.FC = () => {
  const [nineCourse, setNineCourse] = useState<ICourse[]>();
  useEffect(() => {
    const randomNineCourse = async () => {
      const accessToken = localStorage.getItem("access_token") || "";
      try {
        const resJson = await getRandomNineCourse(
          "/course/random-nine-course",
          accessToken
        );
        if (resJson) {
          const data: ICourse[] = await resJson?.data;
          setNineCourse(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    randomNineCourse();
  }, []);

  return (
    <div className="container px-large">
      <div className="mt-xl mb-40">
        <div className="flex flex-col gap-small">
          <span className="text-gray-800 font-semibold text-medium pointer-events-none">
            Flashcard sets
          </span>
          <TabScroll />
          <div className="grid grid-cols-3 gap-small">
            {nineCourse &&
              nineCourse.map((course: ICourse) => (
                <div
                  key={course.id}
                  className="pb-xxsmall overflow-hidden border-2 border-gray-300 rounded-medium bg-gray-100 relative before:absolute before:w-full before:h-1 before:bg-twilight-300 before:bottom-0 before:left-0 before:opacity-0 hover:before:opacity-100 before:transition-all"
                >
                  <Link
                    to={`/course/${course.id}/${generateSlug(course?.title)}${
                      course?.description
                        ? "-" + generateSlug(course?.description)
                        : ""
                    }`}
                  >
                    <div className="p-small h-full flex flex-col justify-between">
                      <div className="flex flex-col items-start">
                        <h2 className="w-full text-small font-semibold text-gray-800 truncate">
                          {course.title}
                        </h2>
                        {course.description && (
                          <div className="w-full flex items-center truncate">
                            <span className="text-base font-medium text-gray-600">
                              {course.description}
                            </span>
                          </div>
                        )}
                        <span className="my-small inline-block text-base font-semibold text-gray-700 min-h-12">
                          <span className="bg-gray-300 py-0.5 px-small rounded-full">
                            {course?.countSentence} term
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-small">
                        <div className="w-6 h-6 rounded-full">
                          <Image
                            imageName={
                              (course.user?.avatar as string) ||
                              "avatar-default.jpg"
                            }
                            className="w-full h-full rounded-full"
                          />
                        </div>
                        <span className="text-base text-gray-800 font-semibold">
                          {course.user?.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
