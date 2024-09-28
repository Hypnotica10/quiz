import React, {
  ChangeEvent,
  ChangeEventHandler,
  createContext,
  FocusEvent,
  FocusEventHandler,
  MouseEvent,
  useContext,
  useState,
} from "react";
import { IPostCourse } from "../types/course";
import { ISentence } from "../types/sentence";

type CreateFlashcardsProviderProps = {
  children: React.ReactNode;
};

type Editing = {
  isEditing: boolean;
};

export type Sentence = Required<Omit<ISentence, "id" | "image">> & Editing;

type InformationFlashcards = Required<
  Omit<IPostCourse, "userId" | "sentences">
>;

type CreateFlashcardsContext = {
  error: {
    title: boolean;
    majorId: boolean;
    term: boolean;
    definition: boolean;
    termEdit: boolean;
    definitionEdit: boolean;
  };
  informationFlashcards: InformationFlashcards;
  sentences: Sentence[];
  sentence: Sentence;
  handleOnBlur: FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleOnChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleClickReset: () => void;
  handleClickAdd: () => void;
  handleClickDelete: (e: MouseEvent<HTMLDivElement>, index: number) => void;
  handleClickEdit: (e: MouseEvent<HTMLDivElement>, index: number) => void;
  updateSentences: (newValue: Sentence, indexNumber: number) => void;
  handleClickCreate: () => void;
};

const initialValues: CreateFlashcardsContext = {
  error: {
    title: false,
    majorId: false,
    term: false,
    definition: false,
    definitionEdit: false,
    termEdit: false,
  },
  informationFlashcards: {
    title: "",
    description: "",
    majorId: "",
  },
  sentences: [],
  sentence: {
    isEditing: false,
    term: "",
    definition: "",
  },
  handleOnBlur: () => {},
  handleOnChange: () => {},
  handleClickReset: () => {},
  handleClickAdd: () => {},
  updateSentences: (newValue: Sentence, indexNumber: number) => {},
  handleClickDelete: (e: MouseEvent<HTMLDivElement>, indexNumber: number) => {},
  handleClickEdit: (e: MouseEvent<HTMLDivElement>, indexNumber: number) => {},
  handleClickCreate: () => {},
};

const CreateFlashcardsContext =
  createContext<CreateFlashcardsContext>(initialValues);

export const CreateFlashcardsProvider = ({
  children,
}: CreateFlashcardsProviderProps) => {
  const [error, setError] = useState(initialValues.error);
  const [informationFlashcards, setInformationFlashcards] = useState(
    initialValues.informationFlashcards
  );
  const [sentence, setSentence] = useState(initialValues.sentence);
  const [sentences, setSentences] = useState(initialValues.sentences);

  console.log(informationFlashcards);

  // handle blur event
  const handleOnBlur = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!e.target.value || e.target.value === "0") {
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
        [e.target.name]: e.target.value.trim(),
      }));
      return;
    }
    setInformationFlashcards({
      ...informationFlashcards,
      [e.target.name]: e.target.value.trim(),
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
    const newSentences = [...sentences, sentence];
    setSentences(newSentences);
    setSentence(initialValues.sentence);
  };

  // handle click delete button
  const handleClickDelete = (
    _e: MouseEvent<HTMLDivElement>,
    indexNumber: number
  ) => {
    const newSentences = sentences.filter(
      (item: ISentence) => item != sentences[indexNumber]
    );
    setSentences(newSentences);
  };

  // handle click edit button
  const handleClickEdit = (
    _e: MouseEvent<HTMLDivElement>,
    indexNumber: number
  ) => {
    console.log(indexNumber);

    setSentences((sentences) =>
      sentences.map((item: Sentence, index: number) =>
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

    setSentences((sentences) =>
      sentences.map((item: Sentence, index: number) => {
        return index === indexNumber
          ? { ...item, ...newValue, isEditing: !item.isEditing }
          : item;
      })
    );
  };

  // handle click create button
  const handleClickCreate = () => {
    console.log("create");
  };

  return (
    <CreateFlashcardsContext.Provider
      value={{
        sentences,
        sentence,
        error,
        informationFlashcards,
        handleClickCreate,
        handleOnBlur,
        handleOnChange,
        handleClickReset,
        handleClickAdd,
        handleClickDelete,
        handleClickEdit,
        updateSentences,
      }}
    >
      {children}
    </CreateFlashcardsContext.Provider>
  );
};

export const useCreateFlashcards = () => {
  const context = useContext(CreateFlashcardsContext);
  if (context === undefined) {
    throw new Error(
      "flashcards must be used within a Create flashcards provider"
    );
  }
  return context;
};
