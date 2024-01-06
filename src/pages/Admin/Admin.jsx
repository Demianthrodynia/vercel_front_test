import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice";
import "./Admin.css";
import { bringUsersByRole, findUsers, updateUserRole } from "../../services/apiCalls";
import { editData, toedit } from "../editSlice";
import { Form } from "react-bootstrap";

export const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminReduxData = useSelector(userData);
  const checkedit = useSelector(editData);
  const [users, setUsers] = useState([]);
  const [finder, setFinder] = useState("");
  const [userDetail, setUserDetail] = useState({});
  const [updateRole, setUpdateRole] = useState("")


  const inputHandler = (e) => {
    setFinder(e.target.value);
  };

  useEffect(() => {
    if (finder !== "") {
      const bringUsers = setTimeout(() => {
        findUsers(adminReduxData.credentials.token, finder)
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => console.error(err));
      }, 500);

      return () => clearTimeout(bringUsers);
    } else {
      findUsers(adminReduxData.credentials)
        .then((results) => {
          setUsers(results.data);
        })
        .catch((err) => console.error(err));
    }
  }, [finder]);


  useEffect(()=> {
    if (updateRole !== "") {
      userDetail.role = updateRole
      updateUserRole(userDetail, adminReduxData.credentials.token)
      
    }
  }, [updateRole])
  

  const bringUsersHandler = (role) => {
    bringUsersByRole(adminReduxData.credentials.token, role)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };

  const detailHandler = (user) => {
    setUserDetail({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.city,
      role: user.role,
    });
  };

  const editHandler = (userData) => {
    const editData = {
      id: userData.id,
      email: userData.email,
      lastname: userData.lastname,
    };

    dispatch(toedit({ data: editData }));

    setTimeout(() => {
      navigate("/profileedit");
    }, 200);
  };

  return (
    <div className="adminDesign">
      <div className="adminContainer">
        <input
          type="text"
          id="adminInput"
          placeholder="Buscar"
          onChange={(e) => inputHandler(e)}
        ></input>

        <div className="adminButtonContainer">
          <button
            className="formContainerButtonDesign"
            onClick={() => bringUsersHandler("GUEST")}
          >
            Invitados
          </button>
          <button
            className="formContainerButtonDesign"
            onClick={() => bringUsersHandler("USER")}
          >
            Miembros
          </button>
          <button
            className="formContainerButtonDesign"
            onClick={() => bringUsersHandler("VIP")}
          >
            VIP
          </button>
          <button
            className="formContainerButtonDesign"
            onClick={() => bringUsersHandler("MOD")}
          >
            Mods
          </button>
          <button
            className="formContainerButtonDesign"
            onClick={() => bringUsersHandler("ADMIN")}
          >
            Admin
          </button>
          <button
            className="formContainerButtonDesign"
            onClick={() => bringUsersHandler("SUPERADMIN")}
          >
            Superadmin
          </button>
        </div>
      </div>

      <div className="resultsContainerDesign">
        <div className="resultsContainer">
          <div className="results">
            <div className="resultsPadding">
              {users.length > 0 && (
                <>
                  {users.map((user) => {
                    return (
                      <div
                        className="userDataContainer"
                        key={user._id}
                        onClick={() => detailHandler(user)}
                      >
                        {user.name} /// {user.email}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="resultsContainer">
          <div className="results" id="detail">
            <div className="resultsPadding">
              {userDetail.email && (
                <>
                  <div className="userDataContainer">id: {userDetail.id}</div>
                  <div className="userDataContainer">
                    nombre: {userDetail.name}
                  </div>
                  <div className="userDataContainer">
                    apellido: {userDetail.lastname}
                  </div>
                  <div className="userDataContainer">
                    email: {userDetail.email}
                  </div>
                  <div className="userDataContainer">
                    ciudad: {userDetail.city}
                  </div>
                  <div className="userDataContainer">
                    role: {userDetail.role}
                  </div>
                  {adminReduxData.credentials.user.role === "SUPERADMIN" ?
                  <Form.Group style={{ display: "flex", alignItems: "center" }}>
                    <Form.Select
                      name={"role"}
                      style={{ margin: "10px" }}
                      onChange={(e) => setUpdateRole(e.target.value)}
                    >
                      <option value="GUEST">guest</option>
                      <option value="USER">user</option>
                      <option value="VIP">vip</option>
                      <option value="MOD">mod</option>
                      <option value="ADMIN">admin</option>
                    </Form.Select>
                  </Form.Group>
                  : (null)}
                  <button
                    className="formContainerButtonDesign"
                    onClick={() => editHandler(userDetail)}
                  >
                    Editar usuario
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
