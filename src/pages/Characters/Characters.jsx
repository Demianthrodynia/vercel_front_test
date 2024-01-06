import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { CharacterCard } from "../../common/CharacterCard/CharacterCard";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../userSlice";
import { bringCharacters, createCharacter } from "../../services/apiCalls";
import { selectchar } from "../characterSlice";
import { useNavigate } from "react-router-dom";
import "./Characters.css";

export const Characters = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userReduxData = useSelector(userData);
  const [characters, setCharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    faction: "",
    description: "",
  });

  useEffect(() => {
    if (!userReduxData.credentials?.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (characters.length === 0) {
      bringCharacters(userReduxData.credentials?.token).then((res) => {
        setCharacters(res.data);
      });
    }
  }, []);

  const dataSetter = (e) => {
    setNewCharacter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitCharacter = async (e) => {
    e.preventDefault(e);
    newCharacter.player = userReduxData.credentials?.user.id;
    createCharacter(newCharacter, userReduxData.credentials?.token).then(() => {
      bringCharacters(userReduxData.credentials?.token).then((res) => {
        setCharacters(res.data);
      });
    });
  };

  const handleDetail = (char) => {
    const charDetail = {
      id: char._id,
      name: char.name,
      faction: char.faction,
      description: char.description,
      player: char.player,
    };
    dispatch(selectchar({ data: charDetail }));
    setTimeout(() => {
      navigate("/characterdetail");
    }, 200);
  };

  return (
    <div className="character-creator">
      <div className="creator-section">
        <br></br>
        <h2>Nuevo Personaje</h2>
        <form onSubmit={(e) => submitCharacter(e)}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name={"name"}
            id="name"
            onChange={(e) => dataSetter(e)}
          />

          <Form.Label>Facción</Form.Label>
          <Form.Select
            id="factionForm"
            name={"faction"}
            onChange={(e) => dataSetter(e)}
          >
            {" "}
            <option value="Ninguna">Ninguna</option>
            <option value="WRG">WRG</option>
            <option value="Resistencia">La Resistencia</option>
            <option value="ND">Nuevo Día</option>
          </Form.Select>

          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name={"description"}
            onChange={(e) => dataSetter(e)}
          />

          <button type="submit">Crear</button>
        </form>
      </div>

      <div className="character-list-section">
        <h2><center>PERSONAJES:</center></h2>
        {characters.length > 0 ? (
          <div className="character-list">
            {characters.map((character) => (
              <CharacterCard
                key={character._id}
                character={character}
                handleDetail={() => handleDetail(character)}
              />
            ))}
          </div>
        ) : (
          <center>¡Primero debes crearlos!</center>
        )}
      </div>
    </div>
  );
};
