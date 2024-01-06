import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { profileCall } from "../../services/apiCalls";
import '../../common/FormContainer/FormContainer.css'

import "./Profile.css";
export const Profile = () => {
  const navigate = useNavigate();
  const userReduxData = useSelector(userData);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (!userReduxData.credentials?.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    profileCall(userReduxData.credentials)
      .then((res) => {
        setProfileData(res.data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="profileDesign">
        {profileData.email !== "" ? (
          <div className="formContainerContainer">
            <h3>Tus Datos:</h3>
            <br></br>
            <h6>Nombre</h6>
            <div className="centerText">
            <h4>{profileData.name}</h4>
            </div>
            <h6>Apellidos</h6>
            <div className="centerText">
            <h4>{profileData.lastname}</h4>
            </div>
            <h6>Email</h6>
            <div className="centerText">
            <h4>{profileData.email}</h4>
            </div>
            <h6>Ciudad</h6>
            <div className="centerText">
            <h4>{profileData.city}</h4>
            </div>
            <button className="formContainerButtonDesign" onClick={() => navigate("/profileedit")}>Editar</button>
            <button className="formContainerButtonDesign" onClick={() => navigate("/characters")}>Personajes</button>
          </div>
        ) : (
          <div>CARGANDO</div>
        )}
    </div>
  ); 
};
