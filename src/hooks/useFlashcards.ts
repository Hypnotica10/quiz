import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { generateSlug } from "../helper/formatString";
import {
  createCourse,
  getCourseById,
  updateCourseById,
} from "../service/courseService";
import { InitialValuesUseFlashcards, Sentence } from "../types/componentType";
import { IPostCourse } from "../types/course";
import { ISentence } from "../types/sentence";
import { IMajor } from "../types/subject";
import { getAllMajor } from "../service/subjectService";
import { handleToast } from "../helper/handleToastify";
import { getSentencesByCourseId } from "../service/sentencesService";

export const useFlashcards = (initialValues: InitialValuesUseFlashcards) => {
  const [listMajor, setListMajor] = useState<IMajor[]>([]);
  const [error, setError] = useState(initialValues.error);
  const [informationFlashcards, setInformationFlashcards] = useState(
    initialValues.informationFlashcards
  );
  const [sentence, setSentence] = useState(initialValues.sentence);
  const [listSentences, setListSentences] = useState(
    initialValues.listSentences
  );
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId: params } = useParams();

  useEffect(() => {
    const { state: locationState } = location;
    const pathname = location.pathname;
    if (!locationState) {
      if (pathname === "/flashcards/copy") {
        handleToast("Cannot find flashcards to copy", "error");
        navigate("/flashcards/sets");
        return;
      } else if (
        !parseInt(params || "") &&
        pathname.includes("/flashcards/edit")
      ) {
        handleToast("Cannot find flashcards to edit", "error");
        return;
      } else if (
        pathname === "/flashcards/sets" ||
        pathname.includes("/flashcards")
      ) {
        return;
      }
    }
    let courseId = "";
    if (pathname === "/flashcards/copy") {
      courseId = locationState?.courseId;
    } else {
      courseId = params || "";
    }
    const accessToken = localStorage.getItem("access_token") || "";
    const getData = async (courseId: string = ""): Promise<void> => {
      try {
        const resJsonCourse = await getCourseById(
          "/course",
          accessToken,
          courseId
        );
        const resJsonSentences = await getSentencesByCourseId(
          "/sentence/all",
          accessToken,
          courseId
        );
        if (resJsonCourse) {
          const data = await resJsonCourse.data;
          setInformationFlashcards({
            title: data?.title,
            description: data?.description || "",
            majorId: data?.major.id.toString(),
          });
        }
        if (resJsonSentences) {
          const data = await resJsonSentences.data;
          const newListSentences: Sentence[] = data.map((item: ISentence) => {
            return pathname.includes("/flashcards/edit")
              ? {
                  id: item.id,
                  isEditing: false,
                  term: item.term,
                  definition: item.definition,
                }
              : pathname.includes("/flashcards/copy")
              ? {
                  isEditing: false,
                  term: item.term,
                  definition: item.definition,
                }
              : {};
          });
          setListSentences([...newListSentences]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData(courseId);
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const getMajor = async () => {
      try {
        const resJson = await getAllMajor("/major/all", accessToken || "");
        if (resJson) {
          setListMajor(resJson?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMajor();
  }, []);

  // handle blur event
  const handleOnBlur = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!e.target.value.trim() || e.target.value === "0") {
      setError({
        ...error,
        [e.target.name]: true,
      });
    } else {
      setError({
        ...error,
        [e.target.name]: false,
      });
    }
  };

  // handle change event
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "term" || e.target.name === "definition") {
      setSentence((sentence) => ({
        ...sentence,
        [e.target.name]: e.target.value,
      }));
      return;
    }
    setInformationFlashcards({
      ...informationFlashcards,
      [e.target.name]: e.target.value,
    });
  };

  // handle click button reset
  const handleClickReset = () => {
    setSentence(initialValues.sentence);
  };

  // handle click button add
  const handleClickAdd = () => {
    if (!sentence.definition?.trim() || !sentence.term?.trim()) {
      setError({
        ...error,
        term: !sentence.term?.trim(),
        definition: !sentence.definition?.trim(),
      });
      return;
    }
    if (sentence.term && sentence.definition) {
      setError({
        ...error,
        term: false,
        definition: false,
      });
    }
    if (error.term || error.definition) {
      return;
    }
    const newSentences = [...listSentences, sentence ];
    setListSentences(newSentences);
    setSentence(initialValues.sentence);
  };
  
  // handle click delete button
  const handleClickDelete = (
    _e: MouseEvent<HTMLDivElement>,
    indexNumber: number
  ) => {
    const newSentences = listSentences.filter(
      (item: ISentence) => item != listSentences[indexNumber]
    );
    setListSentences(newSentences);
  };

  // handle click edit button
  const handleClickEdit = (
    _e: MouseEvent<HTMLDivElement>,
    indexNumber: number
  ) => {
    console.log(indexNumber);

    setListSentences((listSentences) =>
      listSentences.map((item: Sentence, index: number) =>
        index === indexNumber
          ? {
              ...item,
              isEditing: !item.isEditing,
            }
          : item
      )
    );
  };

  // update sentences after edit
  const updateSentences = (newValue: Sentence, indexNumber: number) => {
    console.log(indexNumber);

    setListSentences((listSentences) =>
      listSentences.map((item: Sentence, index: number) => {
        return index === indexNumber
          ? { ...item, ...newValue, isEditing: !item.isEditing }
          : item;
      })
    );
  };

  // handle click create button
  const handleClickCreate = () => {
    if (!informationFlashcards.title.trim()) {
      setError({
        ...error,
        title: true,
      });
      return;
    }
    if (
      !informationFlashcards.majorId.trim() ||
      informationFlashcards.majorId === "0"
    ) {
      setError({
        ...error,
        majorId: true,
        title: true,
      });
      return;
    }
    if (error.title || error.majorId) {
      return;
    }
    let newSentences = [...listSentences];
    newSentences.forEach((item: Sentence) => {
      delete item?.isEditing;
    });
    if (newSentences.length === 0) {
      newSentences = [
        ...newSentences,
        {
          term: "...",
          definition: "...",
        },
      ];
    }
    const postCreateCourse: IPostCourse = {
      title: informationFlashcards.title,
      description: informationFlashcards.description || "",
      majorId: informationFlashcards.majorId,
      userId: state.user?.id?.toString(),
      sentences: newSentences,
    };

    const createNewCourse = async (body: IPostCourse) => {
      const accessToken = localStorage.getItem("access_token") || "";
      try {
        const resJson = await createCourse("/course", accessToken, body);
        if (resJson) {
          const data = await resJson?.data;
          navigate(
            `/course/${data?.id}/${generateSlug(data?.title)}${
              data?.description ? "-" + generateSlug(data?.description) : ""
            }`
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    createNewCourse(postCreateCourse);
  };

  const handleClickUpdate = () => {
    if (!informationFlashcards.title.trim()) {
      setError({
        ...error,
        title: true,
      });
      return;
    }
    if (
      !informationFlashcards.majorId.trim() ||
      informationFlashcards.majorId === "0"
    ) {
      setError({
        ...error,
        majorId: true,
        title: true,
      });
      return;
    }
    if (error.title || error.majorId) {
      return;
    }
    let newSentences = [...listSentences];
    newSentences.forEach((item: Sentence) => {
      delete item?.isEditing;
    });
    if (newSentences.length === 0) {
      newSentences = [
        ...newSentences,
        {
          term: "...",
          definition: "...",
        },
      ];
    }
    const putCourse: IPostCourse = {
      id: params,
      title: informationFlashcards.title,
      description: informationFlashcards.description || "",
      majorId: informationFlashcards.majorId,
      userId: state.user?.id?.toString(),
      sentences: newSentences,
    };

    const updateCourse = async (body: IPostCourse, id: string = "") => {
      const accessToken = localStorage.getItem("access_token") || "";
      try {
        const resJson = await updateCourseById(
          `/course/${id}`,
          accessToken,
          body
        );

        if (resJson) {
          const data = await resJson?.data;
          navigate(
            `/course/${data?.id}/${generateSlug(data?.title)}${
              data?.description ? "-" + generateSlug(data?.description) : ""
            }`
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateCourse(putCourse, params);
  };

  return {
    listMajor,
    error,
    informationFlashcards,
    sentence,
    listSentences,
    handleOnBlur,
    handleOnChange,
    handleClickAdd,
    handleClickReset,
    handleClickDelete,
    updateSentences,
    handleClickEdit,
    handleClickCreate,
    handleClickUpdate,
  };
};
