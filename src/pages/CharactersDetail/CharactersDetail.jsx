import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CharactersDetail.css";
import { characterData } from "../characterSlice";
import { userData } from "../userSlice";
import { Form } from "react-bootstrap";
import { deleteCharacter, updateCharacter } from "../../services/apiCalls";

export const CharactersDetail = () => {
  const navigate = useNavigate();

  const userReduxData = useSelector(userData);
  const character = useSelector(characterData);
  const [myEvents, setMyEvents] = useState([]);

  const [isUpdatePanelOpen, setIsUpdatePanelOpen] = useState(false);
  const [isDeletePanelOpen, setIsDeletePanelOpen] = useState(false);
  const [updatedCharacter, setUpdatedCharacter] = useState({
    ...character.data,
  });

  const dataSetter = (e) => {
    setUpdatedCharacter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdatePanelToggle = () => {
    setIsUpdatePanelOpen((prevState) => !prevState);
    setIsDeletePanelOpen(false)
  };
  const handleDeletePanelToggle = () => {
    setIsDeletePanelOpen((prevState) => !prevState);
    setIsUpdatePanelOpen(false)
  };

  const handleUpdate = async () => {
    const parameters = {
      data: updatedCharacter,
      token: userReduxData.credentials?.token,
    };
    updateCharacter(parameters);
  };

  const handleDelete = async () => {
    const parameters = {
      id: character.data.id,
      token: userReduxData.credentials?.token,
    };
    deleteCharacter(parameters).then(() => {
      setTimeout(() => {
        navigate("/characters");
      }, 250);
    });
  };

  return (
    <div className="screen-view">
      <div className="panelDesign">
      <div className={`delete-panel ${isDeletePanelOpen ? "open" : ""}`}>
        <h2 id="delete-panel-title" onClick={handleDeletePanelToggle}>
          Borrar
        </h2>
        <div className="centerButton">
          <button onClick={handleDelete}>⚠ Borrar ⚠</button>
        </div>
      </div>
      <div className={`update-panel ${isUpdatePanelOpen ? "open" : ""}`}>
        <h2 id="update-panel-title" onClick={handleUpdatePanelToggle}>
          Actualizar
        </h2>
        <div className="update-panel-content">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name={"name"}
            defaultValue={character.data.name}
            onChange={(e) => dataSetter(e)}
          />
          <Form.Label>Facción</Form.Label>
          <Form.Select
            id="factionForm"
            name={"faction"}
            defaultValue={character.data.faction}
            onChange={(e) => dataSetter(e)}
          >
            {" "}
            <option value="Ninguna">Ninguna</option>
            <option value="WRG">WRG</option>
            <option value="Resistencia">La Resistencia</option>
            <option value="ND">Nuevo Día</option>
          </Form.Select>

          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            defaultValue={character.data.description}
            onChange={(e) => dataSetter(e)}
          />

          <button onClick={handleUpdate}>Enviar</button>
        </div>
      </div>
      </div>
      <div className="frame">
        <div className="character-area">
          {character ? (
            <div className="character-details">
              <h2>{character.data.name}</h2>
              <h5>{character.data.faction}</h5>
              <p>{character.data.description}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="myEventsDesign"><h2>Eventos</h2></div>
    </div>
  );
};
