import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateUserCall } from "../../services/apiCalls";
import { userData } from "../userSlice";
import "./ProfileEdit.css";
import { InputText } from "../../common/InputText/InputText";

export const ProfileEdit = () => {
  const navigate = useNavigate();
  const userReduxData = useSelector(userData);

  useEffect(() => {
    if (!userReduxData.credentials?.token) {
      navigate("/");
    }
  }, []);

  const [data, setData] = useState({
    name: userReduxData.credentials?.user.name,
    lastname: userReduxData.credentials?.user.lastname,
    email: userReduxData.credentials?.user.email,
    city: userReduxData.credentials?.user.city,
    password: "",
  });

  const inputHandler = (field) => {
    setData((prevState) => ({
      ...prevState,
      [field.target.name]: field.target.value,
    }));
  };

  const editHandler = () => {
      if (data.password === "") delete data.password
      updateUserCall(data, userReduxData.credentials?.token)
      .then(() => {
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="profileEditDesign">
      <div className="formContainerContainer">
        <InputText
            type={"nombre"}
            className={"basicInput"}
            name={"name"}
            handler={(e) => inputHandler(e)}
        />

        <InputText
            type={"apellidos"}
            className={"basicInput"}
            name={"lastname"}
            handler={(e) => inputHandler(e)}
        />

        <InputText
            type={"email"}
            className={"basicInput"}
            name={"email"}
            handler={(e) => inputHandler(e)}
        />
        <InputText
            type={"ciudad"}
            className={"basicInput"}
            name={"city"}
            handler={(e) => inputHandler(e)}
        />
        <InputText
            type={"password"}
            className={"basicInput"}
            name={"password"}
            handler={(e) => inputHandler(e)}
        />
        <button className="formContainerButtonDesign" onClick={editHandler}>
          Enviar
        </button>
      </div>
    </div>
  );
};
