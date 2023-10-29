import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/auth.context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, requestBody)
      .then((response) => {
        const jwt = response.data.authToken;
        storeToken(jwt);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log("error creating account", errorDescription);
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container-auth">
      <div className="title-auth">
        <h1>Login</h1>
      </div>
      <div className="form-auth">
        {errorMessage && <h4 className="error">{errorMessage} !</h4>}
        <form onSubmit={handleLoginSubmit}>
          <div className="box-label-input login">
            <label>Email</label>
            <input
              type="email"
              placeholder="email@gmail.com"
              name="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="box-label-input input-password login">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a
              onClick={() => setShowPassword(!showPassword)}
              className={
                showPassword
                  ? " pass-control-view show-pass"
                  : " pass-control-view hide-pass"
              }
            />
          </div>
          <button variant="success" type="submit" className="my-2">
            Login
          </button>
        </form>
        <div className="return return-login-signup">
          <p>N'avez-vous pas un compte?</p>
          <Link to="/signup">
            <button variant="info" size="sm" className="ml-2">
              Signup
            </button>
          </Link>
        </div>
        <div className="return return-home">
          <p>Retour à l'accueil</p>
          <Link to="/">
            <button variant="info" size="sm" className="ml-2">
              Accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
