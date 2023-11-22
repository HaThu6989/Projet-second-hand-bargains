import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth.context";

function IsPrivate(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <h3>Loading ...</h3>;
  } else if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return props.children;
  }
}

export default IsPrivate;
