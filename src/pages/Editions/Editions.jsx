import { EventCard } from "../../common/EventCard/EventCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../userSlice";
import { userData } from "../userSlice";
import { Form } from "react-bootstrap";
import "./Editions.css";
import {
  bringEvents,
  joinEvent,
  newEventCall,
  updateEventCall,
} from "../../services/apiCalls";
import { EventModal } from "../../common/EventModal/EventModal";

export const Editions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userReduxData = useSelector(userData);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showOwn, setShowOwn] = useState(false);

  const [detail, setDetail] = useState(false);
  const [editting, setEditting] = useState(false);
  const [newEvent, setNewEvent] = useState({
    _id: null,
    type: "",
    location: "",
    date: "",
    time: "",
    description: "",
  });
  const [availableLocations, setAvailableLocations] = useState([]);
  const [filter, setFilter] = useState({ page: currentPage });

  const getPaginatedEvents = async (isAdmin = false) => {
    try {
      const res = isAdmin
        ? await bringEvents(filter, userReduxData.credentials?.token)
        : await bringEvents(filter);
      setEvents(res.data.events);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userRole = userReduxData.credentials?.user.role;
    const isAdmin = userRole === "ADMIN" || userRole === "SUPERADMIN";

    if (isAdmin) {
      getPaginatedEvents(true);
    } else {
      getPaginatedEvents();
    }
  }, [currentPage, userReduxData.credentials?.token]);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    setFilter(prev => ({...prev, page: newPage}));
  };

  const dataSetter = (e) => {
    setNewEvent((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleModal = () => {
    if (show) {
      if (editting) {
        setNewEvent({}); // reset the newEvent object if the modal is closing in editing mode
        setEditting(false); // reset editing mode when closing the modal
      }
    }
    setShow((prevShow) => !prevShow);
  };

  const toggleEditModal = (e) => {
    // sets the variables and then passes them to the Setter to avoid async issues
    let isEditting = !editting;
    let newEvent = isEditting ? e : {};
    setNewEvent(newEvent);
    setEditting(isEditting);
  };

  useEffect(() => {
    // shows event modal after editting mode is on and event data has been set
    if (editting) {
      toggleModal();
    }
  }, [editting]);

  const submitEvent = () => {
    // submits an update if in editting mode, creates new event otherwise
    editting
      ? updateEventCall(userReduxData.credentials?.token, newEvent)
          .then(() => {
            isAdmin ? getPaginatedEvents(true) : getPaginatedEvents();
          })
          .catch((err) => console.error(err))
      : newEventCall(userReduxData.credentials?.token, newEvent)
          .then(() => {
            isAdmin ? getPaginatedEvents(true) : getPaginatedEvents();
          })
          .catch((err) => console.error(err));
  };

  const deleteEvent = (eventId) => {
    const data = { _id: eventId, active: false };
    updateEventCall(userReduxData.credentials?.token, data)
      .then(() => {
        isAdmin ? getPaginatedEvents(true) : getPaginatedEvents();
      })
      .catch((err) => console.error(err));
  };

  const handleJoin = (event, isAdmin) => {
    joinEvent(userReduxData.credentials?.token, event._id)
      .then(() => {
        const joinedEvents = [...userReduxData.credentials?.user.events];
        const eventIndex = joinedEvents.indexOf(event._id);
        eventIndex !== -1
          ? joinedEvents.splice(eventIndex, 1)
          : joinedEvents.push(event._id);
        dispatch(
          login({
            credentials: {
              ...userReduxData.credentials,
              user: {
                ...userReduxData.credentials?.user,
                events: joinedEvents,
              },
            },
          })
        );
        isAdmin ? getPaginatedEvents(true) : getPaginatedEvents();
      })
      .catch((err) => console.error(err));
  };

  const showAllHandler = (event) => {
    setShowAll(event.target.checked);
    if (event.target.checked) {
      setShowOwn(false);
    }
  };

  const showOwnHandler = (event) => {
    setShowOwn(event.target.checked);
    if (event.target.checked) {
      setShowAll(false);
    }
  };

  const locationHandler = (e) => {
    setAvailableLocations(e.target.value);
  };

  // location debouncer
  useEffect(() => {
    if (availableLocations !== "") {
      const getEvents = setTimeout(() => {
        setFilter((prevState) => ({
          ...prevState,
          location: availableLocations,
        }));
      }, 600);
  
      return () => clearTimeout(getEvents);
    } else {
      setFilter((prevState) => ({
        ...prevState,
        location: "",
      }));
    }
  }, [availableLocations]);
  
  useEffect(() => {
    getPaginatedEvents(); 
  }, [filter]);

  const handleDetail = (e) => {
    const users = e.users;
  };

  return (
    <div className="editionsDesign">
      <div className="editionsDesignPadding">
        <div className="editionsCheckboxDesign">
          <label style={{ color: "white" }}>
            <input
              type="checkbox"
              checked={showAll}
              onChange={showAllHandler}
            />
            Mostrar todos.
          </label>
          <label style={{ color: "white" }}>
            <input
              type="checkbox"
              checked={showOwn}
              onChange={showOwnHandler}
            />
            Mostrar propios.
          </label>

          <Form.Label style={{ color: "white" }}>Ciudad</Form.Label>
          <input
            type="text"
            id="locationInput"
            placeholder="Buscar"
            onChange={(e) => locationHandler(e)}
          ></input>
        </div>
      </div>
      <div className="editionsContainer">
        {events && events.length > 0 ? (
          <div className="editionsWrap">
            {events.map((e) =>
              showAll ? (
                <EventCard
                  type={e.type}
                  description={e.description}
                  location={e.location}
                  date={e.date}
                  time={e.time}
                  key={e._id}
                  role={userReduxData.credentials?.user.role}
                  users={e.users}
                  toggleModal={() => toggleEditModal(e)}
                  onDelete={() => deleteEvent(e._id)}
                  handleJoin={() => handleJoin(e)}
                  handleDetail={() => handleDetail}
                  joined={
                    userReduxData.credentials?.user.events.includes(e._id)
                      ? true
                      : false
                  }
                />
              ) : showOwn ? (
                userReduxData.credentials?.user.events.includes(e._id) ? (
                  <EventCard
                    type={e.type}
                    description={e.description}
                    location={e.location}
                    date={e.date}
                    time={e.time}
                    key={e._id}
                    role={userReduxData.credentials?.user.role}
                    users={e.users}
                    toggleModal={() => toggleEditModal(e)}
                    onDelete={() => deleteEvent(e._id)}
                    handleJoin={() => handleJoin(e)}
                    handleDetail={() => handleDetail}
                    joined={
                      userReduxData.credentials?.user.events.includes(e._id)
                        ? true
                        : false
                    }
                  />
                ) : null
              ) : !userReduxData.credentials?.user.events.includes(e._id) ? (
                detail ? null : (
                  <EventCard
                    type={e.type}
                    description={e.description}
                    location={e.location}
                    date={e.date}
                    time={e.time}
                    key={e._id}
                    role={userReduxData.credentials?.user.role}
                    users={e.users}
                    toggleModal={() => toggleEditModal(e)}
                    onDelete={() => deleteEvent(e._id)}
                    handleJoin={() => handleJoin(e)}
                    handleDetail={() => handleDetail(e)}
                    joined={
                      userReduxData.credentials?.user.events.includes(e._id)
                        ? true
                        : false
                    }
                  />
                )
              ) : null
            )}
          </div>
        ) : (
          <div></div>
        )}
        <div className="pagination">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </button>
          <span style={{ color: "white" }}>
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
        {userReduxData.credentials?.user.role === "ADMIN" ||
        userReduxData.credentials?.user.role === "SUPERADMIN" ? (
          <div className="formContainerButtonDesign" onClick={toggleModal}>
            Crear Evento
          </div>
        ) : null}
      </div>
      <div className="editionsDesignPadding"></div>
      <EventModal
        inputHandler={dataSetter}
        submitEvent={submitEvent}
        toggleModal={toggleModal}
        show={show}
        defaultType={newEvent.type}
        defaultCity={newEvent.location}
        defaultDescription={newEvent.description}
      />
    </div>
  );
};
