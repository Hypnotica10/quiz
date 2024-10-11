import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  CompleteAnimation,
  ConfettiAnimation,
  Icon,
  Image,
  Tooltip,
} from "../components";
import { getCourseById } from "../service/courseService";
import { getSentencesByCourseId } from "../service/sentencesService";
import { ICourse } from "../types/course";
import { ISentence } from "../types/sentence";
import { TooltipPositionEnum } from "../helper/constant";
import TestCourse from "./TestCourse";

const SelfCourse: React.FC = () => {
  const { courseId } = useParams();
  const [listSentences, setListSentences] = useState<ISentence[]>([]);
  const [course, setCourse] = useState<ICourse>({});
  const [activeSentence, setActiveSentence] = useState<number>(0);
  const [isNext, setIsNext] = useState<boolean | null>(null);
  const [cardFlip, setCardFlip] = useState<boolean>(false);
  const [widthProgress, setWidthProgress] = useState<number>(0);
  const [isComplete, setIscomplete] = useState<boolean>(false);
  const flashcardsCompleteRef = useRef<HTMLDivElement>(null);
  const [test, setTest] = useState<boolean>(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClickOpenTest = () => {
    setTest(true);
    document.body.style.overflow = "hidden";
  };

  const handleClickCloseTest = () => {
    setTest(false);
    document.body.style.overflow = "auto";
  };

  const handleClickRestart = (): void => {
    setActiveSentence(0);
    setIscomplete(false);
    setWidthProgress(0);
    setIsNext(null);
  };

  const handleClickNextSentence = (): void => {
    setIsNext(true);
    setCardFlip(false);
    setActiveSentence((activeSentence) => {
      if (activeSentence + 1 < listSentences.length) {
        return activeSentence + 1;
      } else {
        setIscomplete(true);
        return activeSentence;
      }
    });
    setWidthProgress(
      activeSentence + 1 > listSentences.length
        ? activeSentence * (100 / listSentences.length)
        : (activeSentence + 1) * (100 / listSentences.length)
    );
  };

  const handleClickPrevSentence = (): void => {
    setIsNext(false);
    setCardFlip(false);
    setActiveSentence((activeSentence) =>
      activeSentence - 1 < 0 ? activeSentence : activeSentence - 1
    );
    setWidthProgress(
      activeSentence - 1 < 0
        ? activeSentence * (100 / listSentences.length)
        : (activeSentence - 1) * (100 / listSentences.length)
    );
  };

  const handleClickFlipCard = (): void => {
    setCardFlip(!cardFlip);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token") || "";
    const getData = async (courseId: string = ""): Promise<void> => {
      try {
        const [resJsonCourse, resJsonSentences] = await Promise.all([
          getCourseById("/course", accessToken, courseId),
          getSentencesByCourseId("/sentence/all", accessToken, courseId),
        ]);
        if (resJsonCourse) {
          const data = await resJsonCourse.data;
          setCourse(data);
        }
        if (resJsonSentences) {
          const data = await resJsonSentences.data;
          setListSentences(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData(courseId);
  }, []);

  return (
    <>
      <div className="container px-large pt-medium pb-40">
        <div className="">
          <h2 className="w-4/6 mx-auto mb-small font-bold text-large break-all">
            {course.title}
          </h2>
          <div className="w-full">
            <div className="w-full">
              <div className="w-4/6 flex justify-start mb-medium gap-large mx-auto">
                <div className="w-40 shadow-small rounded-medium overflow-hidden relative hover:before:bg-twilight-400 before:absolute before:transition-all before:w-full before:h-0.5 before:bg-gray-100 before:bottom-0">
                  <Button
                    buttonClass="w-full py-xsmall transition-all px-small text-gray-800 font-semibold text-small bg-gray-100 flex gap-xsmall items-center cursor-pointer rounded-medium justify-center"
                    type="button"
                  >
                    <div className="w-8 h-8 p-xsmall">
                      <Icon iconName="flashcards" />
                    </div>
                    <span className="">Learn</span>
                  </Button>
                </div>
                <div className="w-40 shadow-small rounded-medium overflow-hidden relative hover:before:bg-twilight-400 before:absolute before:transition-all before:w-full before:h-0.5 before:bg-gray-100 before:bottom-0">
                  <Button
                    handleClick={handleClickOpenTest}
                    buttonClass="w-full py-xsmall transition-all px-small text-gray-800 font-semibold text-small bg-gray-100 flex gap-xsmall items-center cursor-pointer rounded-medium justify-center"
                    type="button"
                  >
                    <div className="w-8 h-8 p-xsmall">
                      <Icon iconName="test" />
                    </div>
                    <span className="">Test</span>
                  </Button>
                </div>
              </div>
            </div>
            <div ref={flashcardsCompleteRef} className="w-4/6 mx-auto">
              {isComplete ? (
                <div className="w-full h-31.25 relative">
                  <div className="flex flex-col gap-medium">
                    <div className="flex justify-between">
                      <h2 className="font-bold text-large max-w-30">
                        Way to go! You’ve reviewed all the cards.
                      </h2>
                      <div className="">
                        <Icon iconName="confetti" />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-6/12 flex flex-col gap-medium">
                        <span className="font-bold text-medium text-gray-600">
                          How you're doing
                        </span>
                        <div className="flex gap-medium items-start">
                          <CompleteAnimation />
                          <div className="flex-grow flex justify-between bg-mint-500 bg-opacity-15 text-mint-500 px-small py-xsmall rounded-full font-semibold text-small">
                            <span>Completed</span>
                            <span>{listSentences.length}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-5/12 flex flex-col gap-medium">
                        <span className="font-bold text-medium text-gray-600">
                          Next steps
                        </span>
                        <Button
                          buttonClass="py-5 px-large bg-twilight-500 text-gray-100 font-semibold text-small w-full hover:bg-twilight-600 transition-all rounded-medium border-2 border-transparent"
                          type="button"
                        >
                          Start learn
                        </Button>
                        <Button
                          handleClick={handleClickRestart}
                          buttonClass="py-5 px-large bg-transparent text-gray-600 font-semibold text-small w-full hover:bg-gray-300 transition-all rounded-medium border-2 border-gray-400"
                          type="button"
                        >
                          Restart Flashcards
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <ConfettiAnimation
                      height={
                        flashcardsCompleteRef.current?.getBoundingClientRect()
                          .height || window.innerHeight
                      }
                      width={
                        flashcardsCompleteRef.current?.getBoundingClientRect()
                          .width || window.innerWidth
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-31.25 flex flex-col">
                  <div className="w-full flex-grow rounded-large relative flex gap-large">
                    {listSentences[activeSentence] && (
                      <div
                        key={listSentences[activeSentence].id}
                        className={`${
                          isNext === null
                            ? "animate-none"
                            : isNext
                            ? "animate-fadeInRight"
                            : "animate-fadeInLeft"
                        } card-wrapper relative w-full flex-shrink-0 rounded-large`}
                      >
                        <div
                          onClick={handleClickFlipCard}
                          className={`cursor-pointer card rounded-large absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all`}
                        >
                          <div
                            className={`${
                              cardFlip ? "active" : ""
                            } bg-gray-100 card-front rounded-large w-full h-full absolute top-0 left-0 transition-all duration-500 shadow-large`}
                          >
                            <div className="w-full h-full py-medium px-large flex items-stretch flex-row justify-stretch">
                              <div className="w-full h-full flex justify-center py-large px-small">
                                <div className="w-full h-full overflow-auto flex-shrink flex-grow basis-0">
                                  <div className="w-full min-h-full flex items-center justify-center break-words text-3xl">
                                    <div>
                                      {listSentences[activeSentence]?.term ||
                                        "..."}
                                    </div>
                                  </div>
                                  {/* <div className="bg-gradient-to-b from-[#fff0] to-gray-100 sticky bottom-0 h-10"></div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${
                              cardFlip ? "active" : ""
                            } bg-gray-100 card-back rounded-large w-full h-full absolute top-0 left-0 transition-all duration-500 shadow-large`}
                          >
                            <div className="w-full h-full py-medium px-large flex items-stretch flex-row justify-stretch">
                              <div className="w-full h-full flex justify-center py-large px-small">
                                <div className="w-full h-full overflow-auto flex-shrink flex-grow basis-0">
                                  <div className="w-full min-h-full flex items-center justify-center break-words text-3xl">
                                    <div>
                                      {listSentences[activeSentence]
                                        ?.definition || "..."}
                                    </div>
                                  </div>
                                  {/* <div className="bg-gradient-to-b from-[#fff0] to-gray-100 sticky bottom-0 h-10"></div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-full bg-gray-200">
                    <div className="w-full py-medium flex justify-center">
                      <div className="flex w-56 items-center justify-between">
                        <div
                          onClick={handleClickPrevSentence}
                          className="w-12 h-12 rounded-full p-xsmall border-2 border-gray-400 text-gray-600 cursor-pointer active:bg-gray-400"
                        >
                          <Icon iconName="arrowleft" />
                        </div>
                        <span className="">
                          {activeSentence + 1} / {listSentences.length}
                        </span>
                        <div
                          onClick={handleClickNextSentence}
                          className="rotate-180 w-12 h-12 rounded-full p-xsmall border-2 border-gray-400 text-gray-600 cursor-pointer active:bg-gray-400"
                        >
                          <Icon iconName="arrowleft" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-400">
                    <div
                      style={{ width: `${widthProgress}%` }}
                      className="h-1 rounded-small bg-gray-600 transition-all"
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-4/6 py-large mx-auto">
          <div className="flex gap-small items-center">
            <Link to={`/user/${course?.user?.id}/sets`}>
              <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
                <Image
                  className="w-full h-full rounded-full"
                  imageName={course?.user?.avatar || ""}
                />
              </div>
            </Link>
            <div className="flex flex-col">
              <span className="text-base text-gray-500">Created by</span>
              <Link to={`/user/${course?.user?.id}/sets`}>
                <span className="text-small text-gray-800 font-semibold cursor-pointer">
                  {course?.user?.name}
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-4/6 mx-auto">
          <div className="flex flex-col gap-medium">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-xxsmall text-gray-800 font-bold text-medium">
                <span>Terms in this set</span>
                <span>({course.countSentence})</span>
              </div>
              {course?.user?.id ===
              JSON.parse(localStorage.getItem("user") || "")?.id ? (
                <div className="relative">
                  <Tooltip
                    direction={TooltipPositionEnum.BOTTOM}
                    elementRef={linkRef}
                  >
                    <span>edit</span>
                  </Tooltip>
                  <Link
                    ref={linkRef}
                    to={`/flashcards/edit/${course?.id}`}
                    state={{ courseId: course?.id }}
                  >
                    <div className="w-10 h-10 p-xsmall border-2 border-gray-400 rounded-small cursor-pointer active:bg-gray-400 text-gray-600">
                      <Icon iconName="edit" />
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <Tooltip
                    direction={TooltipPositionEnum.BOTTOM}
                    elementRef={linkRef}
                  >
                    <span>copy</span>
                  </Tooltip>
                  <Link
                    ref={linkRef}
                    to="/flashcards/copy"
                    state={{ courseId: course?.id }}
                  >
                    <div className="w-10 h-10 p-xsmall border-2 border-gray-400 rounded-small cursor-pointer active:bg-gray-400 text-gray-600">
                      <Icon iconName="copy" />
                    </div>
                  </Link>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-small">
              {listSentences &&
                listSentences.map((sentence: ISentence) => (
                  <div
                    key={sentence?.id}
                    className="text-gray-900 bg-gray-100 rounded-small shadow-base"
                  >
                    <div className="p-medium">
                      <div className="flex justify-between">
                        <div className="w-5/12 border-r-2 border-gray-400 text-small">
                          {sentence?.term}
                        </div>
                        <div className="w-6/12 text-small">
                          {sentence?.definition}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {test && (
        <TestCourse
          countSentence={course?.countSentence || 0}
          courseId={course?.id || 0}
          handleClickCloseTest={handleClickCloseTest}
        />
      )}
    </>
  );
};

export default SelfCourse;
