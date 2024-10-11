import React from "react";
import { IconProps } from "../../types/componentType";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Close,
  Confetti,
  Copy,
  Drag,
  Edit,
  Flashcards,
  FullLogo,
  Home,
  Languages,
  Library,
  Line,
  Logout,
  Math,
  Menu,
  MiniLogo,
  Other,
  QuizTestDone,
  Science,
  SetFlashcards,
  Settings,
  SocialScience,
  Test,
  Trash,
  True
} from "./svg";

const Icon: React.FC<IconProps> = (props) => {
  const { iconName } = props;
  switch (iconName) {
    case "fulllogo": {
      return <FullLogo />;
    }
    case "arrowDown": {
      return <ArrowDown />;
    }
    case "flashcards": {
      return <Flashcards />;
    }
    case "test": {
      return <Test />;
    }
    case "languages": {
      return <Languages />;
    }
    case "math": {
      return <Math />;
    }
    case "science": {
      return <Science />;
    }
    case "socialscience": {
      return <SocialScience />;
    }
    case "other": {
      return <Other />;
    }
    case "arrowright": {
      return <ArrowRight />;
    }
    case "menu": {
      return <Menu />;
    }
    case "minilogo": {
      return <MiniLogo />;
    }
    case "line": {
      return <Line />;
    }
    case "close": {
      return <Close />;
    }
    case "arrowleft": {
      return <ArrowLeft />;
    }
    case "home": {
      return <Home />;
    }
    case "library": {
      return <Library />;
    }
    case "setflashcards": {
      return <SetFlashcards />;
    }
    case "settings": {
      return <Settings />;
    }
    case "logout": {
      return <Logout />;
    }
    case "copy": {
      return <Copy />;
    }
    case "edit": {
      return <Edit />;
    }
    case "confetti": {
      return <Confetti />;
    }
    case "trash": {
      return <Trash />;
    }
    case "drag": {
      return <Drag />;
    }
    case "quiztestdone": {
      return <QuizTestDone />;
    }
    case "true": {
      return <True />;
    }
  }
};

export default Icon;
