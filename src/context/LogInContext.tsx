import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children?: ReactNode;
};

const useLogIn = () => {
  const [isRenderSignUp, setRenderSignUp] = useState<boolean>(false);
  const [isRenderSignIn, setRenderSignIn] = useState<boolean>(false);
  const handleClickSignUp = () => {
    if (isRenderSignUp) {
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "hidden";
    }
    setRenderSignUp(!isRenderSignUp);
  };
  const handleClickSignIn = () => {
    if (isRenderSignIn) {
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "hidden";
    }
    setRenderSignIn(!isRenderSignIn);
  };
  const handleClickChangeState = () => {
    if (isRenderSignUp && !isRenderSignIn) {
      setRenderSignUp(!isRenderSignUp);
      setRenderSignIn(!isRenderSignIn);
    } else {
      setRenderSignUp(!isRenderSignUp);
      setRenderSignIn(!isRenderSignIn);
    }
  };
  return {
    isRenderSignUp,
    isRenderSignIn,
    handleClickSignUp,
    handleClickSignIn,
    handleClickChangeState,
  };
};

type UseLogIn = ReturnType<typeof useLogIn>;

const initialValues: UseLogIn = {
  isRenderSignUp: false,
  isRenderSignIn: false,
  handleClickSignUp: () => {},
  handleClickSignIn: () => {},
  handleClickChangeState: () => {},
};

const LogInContext = createContext<UseLogIn>(initialValues);

export const LogInProvider = ({ children }: Props) => {
  const values = useLogIn();

  return (
    <LogInContext.Provider value={values}>{children}</LogInContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLogInContext = () => {
  const context = useContext(LogInContext);
  if (context === undefined) {
    throw new Error("log in must be used within a LogInProvider");
  }
  return context;
};
