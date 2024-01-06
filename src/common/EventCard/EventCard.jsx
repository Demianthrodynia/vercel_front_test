import { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./EventCard.css";
import { ConfirmationModal } from "../ConfirmModal/ConfirmModal";

export const EventCard = ({
  img,
  type,
  description,
  location,
  date,
  time,
  role,
  toggleModal,
  onDelete,
  joined,
  handleJoin,
  handleDetail,
  users
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Card style={{ width: "18rem" }} >
      <Card.Title
        id="cardDesign"
        variant="top"
        src={img ? img : "Aquí habrá imágenes"}
      />
      <Card.Body id="cardDesign">
        <Card.Title>{type}</Card.Title>
        <Card.Text class="overflow">{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Ciudad: {location}</ListGroup.Item>
        <ListGroup.Item>
          Fecha: {new Date(date).toLocaleDateString()}
        </ListGroup.Item>
        <ListGroup.Item>Hora: {time}</ListGroup.Item>
      </ListGroup>
      {role === "ADMIN" || role === "SUPERADMIN" ? (
        <Card.Body>
          <Card.Link href="#" onClick={handleDetail}>Detalles</Card.Link>
          <Card.Link href="#" onClick={toggleModal}>
            Editar
          </Card.Link>
          <Card.Link href="#" onClick={handleOpenModal}>
            Eliminar
          </Card.Link>
        </Card.Body>
      ) : (
        <Card.Body>
          {joined ? (
            <Card.Link href="#" onClick={handleJoin}>Desapuntarse</Card.Link>
          ) : (
            <Card.Link href="#" onClick={handleJoin}>Unirse</Card.Link>
          )}
        </Card.Body>
      )}

      <ConfirmationModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        onDelete={onDelete}
      />
    </Card>
  );
};
