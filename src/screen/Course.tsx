import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Pagination, TabScroll } from "../components";
import { generateSlug } from "../helper/formatString";
import { getCourseBySubjectId } from "../service/courseService";
import { ICourse } from "../types/course";
import { InformationPage } from "../types/componentType";

const getData = async (
  accessToken: string,
  subjectId: number,
  pageNumber?: number
) => {
  const pathUrl = pageNumber
    ? `/course?id=${subjectId}&page=${pageNumber}`
    : `/course?id=${subjectId}`;
  try {
    const resJson = await getCourseBySubjectId(pathUrl, accessToken);
    const data = await resJson?.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const Course: React.FC = () => {
  const [course, setCourse] = useState<ICourse[]>();
  const [subject, setSubject] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [informationPage, setInformationPage] = useState<InformationPage>({
    coursePerPage: 0,
    totalCourse: 0,
    pageNumber: 0,
    totalPage: 0,
  });

  const handlePreviousPage = async () => {
    const accessToken = localStorage.getItem("access_token") || "";
    let pageQuery = currentPage;
    if (pageQuery === 1) {
      return;
    }
    pageQuery -= 2;
    getData(accessToken, subject, pageQuery).then((data) => {
      setCourse(data?.content);
      setInformationPage({
        ...informationPage,
        coursePerPage: data?.size,
        totalCourse: data?.totalElements,
        pageNumber: data?.number + 1,
        totalPage: data?.totalPages,
      });
      setCurrentPage(data?.number + 1);
    });
  };

  const handleNextPage = async () => {
    const accessToken = localStorage.getItem("access_token") || "";
    const pageQuery = currentPage;
    if (pageQuery === informationPage.totalPage) {
      return;
    }
    getData(accessToken, subject, pageQuery).then((data) => {
      console.log(data);

      setCourse(data?.content);
      setInformationPage({
        ...informationPage,
        coursePerPage: data?.size,
        totalCourse: data?.totalElements,
        pageNumber: data?.number + 1,
        totalPage: data?.totalPages,
      });
      setCurrentPage(data?.number + 1);
    });
  };

  const handleSelectPage = async (
    _e: MouseEvent<HTMLButtonElement>,
    num: number
  ) => {
    const accessToken = localStorage.getItem("access_token") || "";
    getData(accessToken, subject, num - 1).then((data) => {
      setCourse(data?.content);
      setInformationPage({
        ...informationPage,
        coursePerPage: data?.size,
        totalCourse: data?.totalElements,
        pageNumber: data?.number + 1,
        totalPage: data?.totalPages,
      });
      setCurrentPage(data?.number + 1);
    });
  };

  const getSubjectActive = (id: number) => {
    if (id === subject) {
      return;
    }
    setSubject(id);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token") || "";
    getData(accessToken, subject).then((data) => {
      setCourse(data?.content);
      setInformationPage({
        ...informationPage,
        coursePerPage: data?.size,
        totalCourse: data?.totalElements,
        pageNumber: data?.number + 1,
        totalPage: data?.totalPages,
      });
      setCurrentPage(data?.number + 1);
    });
  }, [subject]);

  return (
    <div className="container px-large">
      <div className="mt-xl mb-40">
        <div className="flex flex-col gap-small">
          <span className="text-gray-800 font-semibold text-medium pointer-events-none">
            Flashcard sets
          </span>
          <TabScroll getSubjectActive={getSubjectActive} />
          <div className="grid grid-cols-3 gap-small">
            {course &&
              course.map((course: ICourse) => (
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
          {informationPage && informationPage.totalPage > 1 && (
            <Pagination
              currentPage={currentPage}
              informationPage={informationPage}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              handleSelectPage={handleSelectPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
