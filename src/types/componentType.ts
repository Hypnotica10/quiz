import {
  ButtonHTMLAttributes,
  ChangeEventHandler,
  DetailedHTMLProps,
  FocusEventHandler,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from "react";
import { IPostCourse } from "./course";
import { ISentence } from "./sentence";
import { TooltipPositionEnum } from "../helper/constant";

// default HTML props for an input
type DefaultTextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface ICustomTextInputProps {
  name: string;
  label?: string;
  errorText?: string;
  helpText?: string;
  onChangeText?(text: string): void;
}

export type TextInputProps = DefaultTextInputProps & ICustomTextInputProps;

// default HTML props for an button
type DefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ICustomButtonProps {
  type: "button" | "submit" | "reset";
  buttonClass: string;
  children: ReactNode;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = DefaultButtonProps & ICustomButtonProps;

// default HTML props for an image
type DefaultImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

interface ICustomImageProps {
  imageName: string;
  className: string;
}

// image type
export type ImageProps = DefaultImageProps & ICustomImageProps;

// icon type
export type IconProps = {
  iconName: string;
};

export type ConfettiAnimationProps = {
  width: number;
  height: number;
};

type Editing = {
  isEditing?: boolean;
};

export type Sentence = Omit<ISentence, "image"> & Editing;

export type InformationFlashcards = Required<
  Omit<IPostCourse, "userId" | "sentences" | "id">
>;

export type ErrorCreateFlashcards = {
  title: boolean;
  majorId: boolean;
  term: boolean;
  definition: boolean;
};

export type FieldAddSentenceProps = {
  error: ErrorCreateFlashcards;
  sentence: Sentence;
  handleOnBlur: FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleOnChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleClickAdd: () => void;
  handleClickReset: () => void;
};

export type SentencePreviewProps = {
  index: number;
  listSentences: Sentence[];
  handleClickEdit: (e: MouseEvent<HTMLDivElement>, indexNumber: number) => void;
  handleClickDelete: (
    e: MouseEvent<HTMLDivElement>,
    indexNumber: number
  ) => void;
  updateSentences: (newValue: Sentence, indexNumber: number) => void;
};

export type InitialValuesUseFlashcards = {
  error: ErrorCreateFlashcards;
  informationFlashcards: InformationFlashcards;
  sentence: Sentence;
  listSentences: Sentence[];
};

export type OverlayProps = {
  children: ReactNode;
  handleOnClose?: MouseEventHandler<HTMLDivElement>;
  isOverlayActive: boolean;
};

export type TooltipProps = {
  elementRef: RefObject<HTMLElement>;
  children: React.ReactNode;
  direction: TooltipPositionEnum;
};

export type TestCourseProps = {
  handleClickCloseTest: MouseEventHandler;
  courseId: number;
  countSentence: number;
};

export type TabScrollProps = {
  getSubjectActive: (id: number) => void;
};

export type InformationPage = {
  coursePerPage: number;
  totalCourse: number;
  pageNumber: number;
  totalPage: number;
};

export type PaginationProps = {
  currentPage: number;
  informationPage: InformationPage;
  handleSelectPage: (e: MouseEvent<HTMLButtonElement>, num: number) => void;
  handlePreviousPage: MouseEventHandler<HTMLButtonElement>;
  handleNextPage: MouseEventHandler<HTMLButtonElement>;
};
