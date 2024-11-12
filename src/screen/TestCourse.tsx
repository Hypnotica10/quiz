import React, {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, CompleteAnimation, Icon, Overlay } from "../components";
import { getQuizTest } from "../service/courseService";
import { TestCourseProps } from "../types/componentType";
import { IQuizTestResponse, SentenceTest } from "../types/course";

type ResultTest = {
  correct: number;
  incorrect: number;
};

type ListAnswerFromUser = {
  id: number;
  isCorrect: boolean;
  term: string;
  definition: string;
}[];

type SentenceInTestProps = {
  sentence: SentenceTest;
  indexSentence: number;
  questionNumber: number;
  listAnswerFromUser: ListAnswerFromUser;
  resultTest?: ResultTest;
  correctAnswer?: string;
  handleChoice?: (e: MouseEvent<HTMLDivElement>, key: string) => void;
};

type ResultTestProps = {
  resultTest: ResultTest;
  questionNumber: number;
  listAnswerFromUser: ListAnswerFromUser;
  informationQuizTest: IQuizTestResponse;
  timer: number;
  handleClickCloseTest: MouseEventHandler;
  handleRetest: MouseEventHandler;
};

const SentenceInTest: React.FC<SentenceInTestProps> = (props) => {
  const {
    sentence,
    indexSentence,
    questionNumber,
    listAnswerFromUser,
    resultTest,
    correctAnswer,
    handleChoice,
  } = props;

  return (
    <div className="">
      <div className="px-large py-medium rounded-medium bg-gray-100 shadow-small flex flex-col">
        <div className="mb-xxl flex flex-col">
          <div className="mb-medium flex justify-between">
            <span className="font-semibold text-base text-gray-600">Term</span>
            <span className="font-normal text-base text-gray-500">
              {indexSentence + 1} of {questionNumber}
            </span>
          </div>
          <div>
            <div className="font-normal text-medium">{sentence?.question}</div>
          </div>
        </div>
        <div aria-label={sentence?.question}>
          <div className="font-semibold text-base mb-medium">
            {resultTest ? (
              listAnswerFromUser[indexSentence].isCorrect ? (
                <span className="text-mint-600">Awesome!</span>
              ) : (
                <span className="text-error-300">
                  Not quite, you're still learning!
                </span>
              )
            ) : (
              <span className="text-gray-600">Choose matching definition</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-medium">
            {sentence?.answer &&
              sentence?.answer.map((item: string, index: number) => (
                <div
                  onClick={(e) => {
                    if (handleChoice) handleChoice(e, sentence?.question);
                  }}
                  key={index}
                  className={`cursor-pointer font-normal text-small rounded-medium border-2 transition-all ${
                    !correctAnswer
                      ? listAnswerFromUser[indexSentence].definition === item
                        ? "border-twilight-400 bg-twilight-100"
                        : "border-gray-300 bg-transparent"
                      : item === correctAnswer
                      ? "border-mint-600"
                      : listAnswerFromUser[indexSentence].definition === item
                      ? "border-error-300"
                      : "text-gray-500"
                  }`}
                >
                  <div aria-label={item} className="p-small flex">
                    {!correctAnswer ? (
                      <></>
                    ) : item === correctAnswer ? (
                      <div className="text-mint-600 w-6 h-6 mr-medium">
                        <Icon iconName="true" />
                      </div>
                    ) : listAnswerFromUser[indexSentence].definition ===
                      item ? (
                      <div className="text-error-300 w-6 h-6 mr-medium">
                        <Icon iconName="close" />
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="pointer-events-none">{item}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultTest: React.FC<ResultTestProps> = (props) => {
  const {
    resultTest,
    listAnswerFromUser,
    questionNumber,
    informationQuizTest,
    timer,
    handleClickCloseTest,
    handleRetest,
  } = props;

  const convertTimer = (timer: number) => {
    if (timer < 60) {
      return `${timer} secs`;
    } else if (timer > 60) {
      if (timer % 60 === 0) {
        return `${timer / 60} mins`;
      } else {
        return `${Math.floor(timer / 60)} mins ${timer % 60} secs`;
      }
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-medium">
        <div className="font-bold text-large mt-medium">Your test results</div>
        <div className="flex">
          <div className="flex flex-col gap-medium flex-grow">
            <div className="font-bold text-medium text-gray-600">
              Your time: {convertTimer(timer)}
            </div>
            <div className="flex gap-medium">
              <CompleteAnimation />
              <div className="flex flex-col gap-small max-w-52 w-full">
                <div className="flex justify-between">
                  <span className="font-semibold text-small text-mint-500">
                    Correct
                  </span>
                  <span className="font-semibold text-small text-mint-500 w-12 flex justify-center items-center border border-mint-300 rounded-large bg-mint-100">
                    {resultTest?.correct}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-small text-sherbert-500">
                    Incorrect
                  </span>
                  <span className="font-semibold text-small text-sherbert-500 w-12 flex justify-center items-center border border-sherbert-300 rounded-large bg-sherbert-100">
                    {resultTest?.incorrect}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-medium flex-grow">
            <div className="font-bold text-medium text-gray-600">
              Next steps
            </div>
            <div className="flex flex-col gap-medium">
              <Button
                handleClick={handleRetest}
                buttonClass="py-5 px-large bg-twilight-500 text-gray-100 font-semibold text-small w-full hover:bg-twilight-600 transition-all rounded-medium border-2 border-transparent"
                type="button"
              >
                Retest
              </Button>
              <Button
                handleClick={handleClickCloseTest}
                buttonClass="py-5 px-large bg-transparent text-gray-600 font-semibold text-small w-full hover:bg-gray-300 transition-all rounded-medium border-2 border-gray-400"
                type="button"
              >
                Back to flashcard
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-xxl">
        <h4 className="font-bold text-medium text-gray-600">Your answers</h4>
        <div className="mt-large flex flex-col gap-large pb-xxl mb-xxl">
          {informationQuizTest?.listSentence &&
            informationQuizTest?.listSentence.map(
              (item: SentenceTest, index) => (
                <SentenceInTest
                  correctAnswer={informationQuizTest.solution[item.question]}
                  resultTest={resultTest}
                  listAnswerFromUser={listAnswerFromUser}
                  questionNumber={questionNumber}
                  indexSentence={index}
                  sentence={item}
                  key={index}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};

const TestCourse: React.FC<TestCourseProps> = (props) => {
  const { handleClickCloseTest, courseId, countSentence } = props;
  const [isOverlayActive, setIsOverlayActive] = useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [questionNumber, setQuestionNumber] = useState<number>(
    countSentence >= 30
      ? 20
      : countSentence >= 20
      ? countSentence / 2
      : countSentence
  );
  const [informationQuizTest, setInformationQuizTest] =
    useState<IQuizTestResponse>({
      questionNumber: 0,
      title: "",
      listSentence: [],
      solution: {},
    });
  const [listAnswerFromUser, setListAnswerFromUser] =
    useState<ListAnswerFromUser>([]);
  const [submit, setSubmit] = useState<boolean>(false);
  const [resultTest, setResultTest] = useState<ResultTest>({
    correct: 0,
    incorrect: 0,
  });
  const sentenceChoiceRef = useRef<number>(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const screenTestRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);
  const timeInterval = useRef<ReturnType<typeof setInterval>>();

  const handleRetest = () => {
    sentenceChoiceRef.current = 0;
    setSubmit(false);
    setTimeout(() => {
      setIsModalActive(true);
      setIsOverlayActive(true);
    }, 200);
    const accessToken = localStorage.getItem("access_token") || "";
    const getData = async (courseId: number, questionNumber: number) => {
      try {
        const resJson = await getQuizTest(
          `/quiz-test?id=${courseId}&limit=${questionNumber}`,
          accessToken
        );
        const data = await resJson?.data;
        if (data) {
          setInformationQuizTest(data);
          let newListAnswerFromUser: {
            id: number;
            isCorrect: boolean;
            term: string;
            definition: string;
          }[] = [];
          for (let i = 0; i < data?.listSentence.length; i++) {
            const obj = {
              id: i,
              isCorrect: true,
              term: data?.listSentence[i]?.question,
              definition: "",
            };
            newListAnswerFromUser = [...newListAnswerFromUser, obj];
          }
          setListAnswerFromUser(newListAnswerFromUser);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData(courseId, questionNumber);
  };

  function handleChoice(e: MouseEvent<HTMLDivElement>, key: string) {
    const { ariaLabel } = e.target as HTMLDivElement;
    const newListAnswerFromUser = listAnswerFromUser.map((item) => {
      if (item.term === key) {
        return {
          ...item,
          definition: ariaLabel === item.definition ? "" : ariaLabel || "",
        };
      }
      return item;
    });
    sentenceChoiceRef.current = newListAnswerFromUser.reduce(
      (sum, item) => (item.definition ? (sum += 1) : sum),
      0
    );
    setListAnswerFromUser(newListAnswerFromUser);
  }

  const handleCloseModal = () => {
    setIsModalActive(false);
    setTimeout(() => {
      setIsOverlayActive(false);
    }, 200);
  };

  const handleOpenOverlay = () => {
    setIsModalActive(true);
    setIsOverlayActive(true);
  };

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) > countSentence) {
      e.target.value = countSentence.toString();
    } else if (parseInt(e.target.value) <= 0) {
      e.target.value = "1";
    }
    setQuestionNumber(
      isNaN(parseInt(e.target.value)) ? 1 : parseInt(e.target.value)
    );
  };

  const handleSubmit = () => {
    const solution = informationQuizTest.solution;
    const newListAnswerFromUser = listAnswerFromUser.map((item) => {
      if (solution[item.term] !== item.definition) {
        return {
          ...item,
          isCorrect: false,
        };
      }
      return item;
    });
    const correct = newListAnswerFromUser.reduce(
      (sum, item) => (item.isCorrect ? (sum += 1) : sum),
      0
    );
    const newResultTest = {
      correct: correct,
      incorrect: listAnswerFromUser.length - correct,
    };
    setListAnswerFromUser(newListAnswerFromUser);
    setResultTest(newResultTest);
    setSubmit(true);
    screenTestRef.current?.scrollTo(0, 0);
    clearInterval(timeInterval.current);
  };

  const handleClickGetQuizTest = async () => {
    const accessToken = localStorage.getItem("access_token") || "";
    try {
      const resJson = await getQuizTest(
        `/quiz-test?id=${courseId}&limit=${questionNumber}`,
        accessToken
      );
      const data = await resJson?.data;
      if (data) {
        setInformationQuizTest(data);
        let newListAnswerFromUser: {
          id: number;
          isCorrect: boolean;
          term: string;
          definition: string;
        }[] = [];
        for (let i = 0; i < data?.listSentence.length; i++) {
          const obj = {
            id: i,
            isCorrect: true,
            term: data?.listSentence[i]?.question,
            definition: "",
          };
          newListAnswerFromUser = [...newListAnswerFromUser, obj];
        }
        setListAnswerFromUser(newListAnswerFromUser);
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalActive(false);
    setTimeout(() => {
      setIsOverlayActive(false);
    }, 200);
    timeInterval.current = setInterval(() => {
      timer.current += 1;
    }, 1000);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsModalActive(true);
      setIsOverlayActive(true);
    }, 200);
    const accessToken = localStorage.getItem("access_token") || "";
    const getData = async (courseId: number, questionNumber: number) => {
      try {
        const resJson = await getQuizTest(
          `/quiz-test?id=${courseId}&limit=${questionNumber}`,
          accessToken
        );
        const data = await resJson?.data;
        if (data) {
          setInformationQuizTest(data);
          let newListAnswerFromUser: {
            id: number;
            isCorrect: boolean;
            term: string;
            definition: string;
          }[] = [];
          for (let i = 0; i < data?.listSentence.length; i++) {
            const obj = {
              id: i,
              isCorrect: true,
              term: data?.listSentence[i]?.question,
              definition: "",
            };
            newListAnswerFromUser = [...newListAnswerFromUser, obj];
          }
          setListAnswerFromUser(newListAnswerFromUser);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData(courseId, questionNumber);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        ref={screenTestRef}
        className="fixed top-0 left-0 right-0 bottom-0 bg-gray-200 z-50 overflow-auto"
      >
        <div className="">
          <div className="sticky top-0 w-full z-50 bg-gray-100">
            <div className="px-medium py-xsmall flex items-center justify-between">
              <div className="flex items-center gap-xsmall">
                <div className="w-8 h-8">
                  <Icon iconName="test" />
                </div>
                <span className="font-semibold text-small text-gray-600">
                  Test
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-bold text-gray-700 text-small flex gap-xsmall">
                  <span>{sentenceChoiceRef.current}</span>
                  <span>/</span>
                  <span>{informationQuizTest?.questionNumber}</span>
                </div>
                <div className="font-semibold text-gray-600 text-base">
                  <span>{informationQuizTest.title}</span>
                </div>
              </div>
              <div className="flex gap-small">
                <div className="">
                  {!submit && (
                    <Button
                      handleClick={handleOpenOverlay}
                      buttonClass="py-xsmall px-small border-2 border-gray-400 rounded-medium text-gray-600 font-semibold bg:transparent hover:bg-gray-300 transition-all"
                      type="button"
                    >
                      Options
                    </Button>
                  )}
                </div>
                <div
                  onClick={handleClickCloseTest}
                  className="w-10 h-10 p-xsmall border-2 border-gray-400 rounded-medium text-gray-600 cursor-pointer bg:transparent hover:bg-gray-300 transition-all"
                >
                  <Icon iconName="close" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-large w-full max-w-52.5 px-large mx-auto">
            {submit ? (
              <ResultTest
                timer={timer.current}
                handleRetest={handleRetest}
                handleClickCloseTest={handleClickCloseTest}
                informationQuizTest={informationQuizTest}
                listAnswerFromUser={listAnswerFromUser}
                questionNumber={questionNumber}
                resultTest={resultTest}
              />
            ) : (
              <div className="flex flex-col gap-xxl">
                <div className="flex flex-col gap-large">
                  {informationQuizTest?.listSentence &&
                    informationQuizTest?.listSentence.map(
                      (item: SentenceTest, index) => (
                        <SentenceInTest
                          listAnswerFromUser={listAnswerFromUser}
                          handleChoice={handleChoice}
                          questionNumber={questionNumber}
                          indexSentence={index}
                          sentence={item}
                          key={index}
                        />
                      )
                    )}
                </div>
                <div className="my-xxl w-full max-w-52.5 px-large mx-auto pb-xxl">
                  <div className="flex flex-col items-center">
                    <div className="mb-large">
                      <Icon iconName="quiztestdone" />
                    </div>
                    <h3 className="font-bold text-medium mb-large">
                      All done! Ready to submit your test?
                    </h3>
                    <Button
                      handleClick={handleSubmit}
                      buttonClass="py-small px-large bg-twilight-500 text-small text-gray-100 font-semibold rounded-medium hover:bg-twilight-600 transition-all"
                      type="button"
                    >
                      Submit test
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOverlayActive && (
        <Overlay ref={overlayRef} isOverlayActive={isOverlayActive}>
          <div className="modal-container max-w-45 w-full my-10 mx-auto overflow-x-hidden">
            <div
              className={`${
                isModalActive ? "animate-fadeInDown" : "animate-fadeOutUp"
              } p-large flex flex-col bg-gray-100 rounded-large relative gap-small`}
            >
              <div
                onClick={handleCloseModal}
                className="absolute w-8 h-8 p-xsmall text-gray-600 top-small right-small cursor-pointer"
              >
                <Icon iconName="close" />
              </div>
              <div className="flex items-center justify-between my-small">
                <div className="w-1/2 flex flex-col">
                  <p className="font-semibold text-medium truncate">
                    {informationQuizTest.title}
                  </p>
                  <p className="font-bold text-large">Set up your test</p>
                </div>
                <div className="w-20 h-20 flex-shrink-0">
                  <Icon iconName="test" />
                </div>
              </div>
              <div className="mt-small pb-small flex justify-between items-center border-b-2 border-gray-300">
                <div className="flex gap-xsmall">
                  <span className="font-semibold text-small">Questions</span>
                  <span className="text-small">(max {countSentence})</span>
                </div>
                <div className="w-20">
                  <label className="bg-gray-200 py-xsmall px-small h-12 rounded-medium text-gray-600 overflow-hidden relative flex flex-col justify-center before:w-full before:h-0.5 before:absolute before:bg-gray-200 before:bottom-0 before:left-0 before:transition-all focus-within:before:bg-gray-800">
                    <input
                      onChange={handleOnChangeInput}
                      defaultValue={questionNumber}
                      className="font-semibold bg-transparent text-small border-none outline-none text-gray-800"
                      type="number"
                      name="questionNumber"
                    />
                  </label>
                </div>
              </div>
              <div className="self-end">
                <Button
                  handleClick={handleClickGetQuizTest}
                  buttonClass="py-xsmall px-small bg-twilight-500 text-gray-100 font-semibold rounded-medium hover:bg-twilight-600 transition-all"
                  type="button"
                >
                  Start test
                </Button>
              </div>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default TestCourse;
