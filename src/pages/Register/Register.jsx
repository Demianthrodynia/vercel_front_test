import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { registerCall } from "../../services/apiCalls";
import { userData } from "../userSlice";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();
  const userReduxData = useSelector(userData);

  useEffect(() => {
    if (userReduxData.credentials?.token) {
      navigate("/");
    }
  }, []);

  const [data, setData] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    role: "USER",
  });

  const inputHandler = (field) => {
    setData((prevState) => ({
      ...prevState,
      [field.target.name]: field.target.value,
    }));
  };

  const registerHandler = () => {
    registerCall(data)
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="registerDesign">
      <div className="registerFormContainer">

        <Form.Label id="registerText" htmlFor="basic-url">
          ¡Éstas serán tus credenciales!
        </Form.Label>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type={"email"}
            className={"basicInput"}
            placeholder={""}
            name={"email"}
            onChange={(e) => inputHandler(e)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Contraseña</InputGroup.Text>
          <Form.Control
            type={"password"}
            className={"basicInput"}
            placeholder={""}
            name={"password"}
            onChange={(e) => inputHandler(e)}
          />
        </InputGroup>
        <button className="registerButtonDesign" onClick={registerHandler}>
          Enviar
        </button>
      </div>
    </div>
  );
};
