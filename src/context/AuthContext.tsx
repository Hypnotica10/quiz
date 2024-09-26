import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { AuthActionsEnum } from "../helper/constant";

type Props = {
  children?: ReactNode;
};

// interface AuthContext {
//   authenticated?: boolean;
//   setAuthenticated: (isAuth: boolean) => void;
// }

// const initialValue: AuthContext = {
//   authenticated: !!localStorage.getItem("access_token"),
//   setAuthenticated: () => {},
// };

// const AuthContext = createContext<AuthContext>(initialValue);

// type ActionMap<M extends { [index: string]: any }> = {}
type ActionMap<M> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

interface IInitialStateType {
  authenticated: boolean;
  user: {
    id: number | null;
    username: string;
    name: string;
    avatar: string;
  };
}

const initialState: IInitialStateType = {
  authenticated: !!localStorage.getItem("access_token"),
  user: {
    id: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)?.id
      : null,
    username: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)?.username
      : "",
    name: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)?.name
      : "",
    avatar: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)?.avatar
      : "",
  },
};

type AuthPayload = {
  [AuthActionsEnum.LOGIN]: IInitialStateType;
  [AuthActionsEnum.LOGOUT]: IInitialStateType;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

const authReducer = (state: IInitialStateType, action: AuthActions) => {
  switch (action.type) {
    case AuthActionsEnum.LOGIN:
      return {
        ...state,
        authenticated: !!localStorage.getItem("access_token"),
        user: {
          id: action?.payload?.user?.id,
          username: action?.payload?.user?.username,
          name: action?.payload?.user?.name,
          avatar: action?.payload?.user?.avatar,
        },
      };
    case AuthActionsEnum.LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: {
          id: null,
          username: "",
          name: "",
          avatar: "",
        },
      };
    default:
      return state;
  }
};

interface AuthContext {
  state: IInitialStateType;
  dispatch: Dispatch<AuthActions>;
}

const initialValues: AuthContext = {
  state: initialState,
  dispatch: () => null,
};

const AuthContext = createContext<AuthContext>(initialValues);

export const AuthProvider = ({ children }: Props) => {
  // const [authenticated, setAuthenticated] = useState<boolean>(
  //   !!localStorage.getItem("access_token")
  // );
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log(state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("auth must be used within a AuthProvider");
  }
  return context;
};
