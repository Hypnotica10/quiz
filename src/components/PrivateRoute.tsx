import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import RequiredAuth from "./RequiredAuth";

const PrivateRoute: React.FC = () => {
  const { state } = useAuthContext();
  return state.authenticated ? <Outlet /> : <RequiredAuth />;
};

export default PrivateRoute;
