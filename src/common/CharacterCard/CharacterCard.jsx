import "./CharacterCard.css"

export const CharacterCard = ({ character, handleDetail }) => {
    return (
      <div className="character-card" onClick={handleDetail}>
        <div className="card-content">
          <h5 id="character-name">{character.name}</h5>
          <h5 id="character-faction">{character.faction}</h5>
          <p id="character-description">{character.description}</p>
        </div>
      </div>
    );
  };