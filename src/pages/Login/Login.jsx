import React, { useState, useEffect } from "react";
import { InputText } from "../../common/InputText/InputText";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { loginCall } from "../../services/apiCalls";
import { displayErrorModal } from "../errorModalSlice";

import "./Login.css";
import { ErrorModal } from "../../common/ErrorModal/Error.Modal";

export const Login = () => {
  const dispatch = useDispatch();
  const userReduxData = useSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (userReduxData.credentials?.token) {
      navigate("/");
    }
  }, []);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (field) => {
    setCredentials((prevState) => ({
      ...prevState,
      [field.target.name]: field.target.value,
    }));
  };

  const loginHandler = () => {

    loginCall(credentials)
      .then((res) => {
        const data = {
          token: res.data.token,
          user: jwt_decode(res.data.token),
        };
        dispatch(login({ credentials: data }));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        dispatch(displayErrorModal(error.response.data.message));
      });
  };

  return (
    <div className="loginDesign">
      <div className="loginFormContainer">
        <InputText
          type={"email"}
          className={"basicInput"}
          placeholder={""}
          name={"email"}
          handler={inputHandler}
        />

        <InputText
          type={"password"}
          className={"basicInput"}
          placeholder={""}
          name={"password"}
          handler={inputHandler}
        />

        <button className="loginButtonDesign" onClick={loginHandler}>
          Enviar
        </button>
      </div>
      <ErrorModal />
    </div>
  );
};
