import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log("eror....", error);
        const errorDescription = error.response.data.message;
        console.log("error creating account", errorDescription);
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container-auth">
      <div className="title-auth">
        <h1>Signup</h1>
      </div>
      <div className="form-auth">
        {/* {errorMessage && <Alert className="my-3">{errorMessage}</Alert>} */}
        <form onSubmit={handleSignupSubmit}>
          <div className="box-label-input signup">
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
          <div className="box-label-input signup">
            <label>Nom et prénom</label>
            <input
              type="text"
              placeholder="DEVILLIERS Lucie"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="box-label-input signup">
            <label>Password</label>
            <input
              type="password"
              placeholder="*********"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="box-label-input signup">
            <label>Adresse</label>
            <input
              type="text"
              placeholder="123 Avenue Joseph, 91120 PALAISEAU"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="box-label-input signup">
            <label>N° de téléphone</label>
            <input
              type="text"
              placeholder="+33 695396189"
              name="numberPhone"
              value={numberPhone}
              onChange={(e) => setNumberPhone(e.target.value)}
            />
          </div>
          <button variant="success" type="submit" className="my-2">
            Signup
          </button>
        </form>
        <div className="return return-login-signup">
          <p>Avez-vous un compte?</p>
          <Link to="/login">
            <button variant="info" size="sm" className="ml-2">
              Login
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

export default Signup;
