import React from "react";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export const EventModal = ({inputHandler, submitEvent, toggleModal, show, defaultType, defaultCity,  defaultDescription}) => {


  return (
    <>
    <Modal show={show} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tipo de Evento</Form.Label>
            <Form.Select name={"type"} defaultValue={defaultType} onChange={(e) => inputHandler(e)}>
              <option value="SZ">SZ</option>
              <option value="48">48</option>
              <option value="Rojo">Rojo</option>
              <option value="La Purga">La Purga</option>
              <option value="Cazadores de Demonios">CdD</option>
              <option value="Juegos del Calamar">Calamar</option>
              <option value="Otro">Otro</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              defaultValue={defaultCity}
              name={"location"}
              onChange={(e) => inputHandler(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name={"date"}
              min={new Date()}
              onChange={(e) => inputHandler(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Hora</Form.Label>
            <Form.Control
              type="time"
              name={"time"}
              onChange={(e) => inputHandler(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name={"description"}
              defaultValue={defaultDescription}
              onChange={(e) => inputHandler(e)}
              as="textarea" rows={5} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => toggleModal()}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={() => {submitEvent(); toggleModal()}}>
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}