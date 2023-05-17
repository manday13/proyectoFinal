import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API_URL from "../apiconfig";
import GlobalContext from "../GlobalContext";
import { Modal } from "react-bootstrap";

import { Button } from "react-bootstrap";
import "./IndService.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLessThan } from "@fortawesome/free-solid-svg-icons";
// import Avatar from 'react-avatar';
import { Avatar, Tooltip } from "antd";
// import AvatarGroup from 'react-avatar-group';

function IndService() {
  const goTo = useNavigate();

  const { id, token, setToken, type } = useContext(GlobalContext);
  const { ids } = useParams();
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [ableButton, setAbleButton] = useState(false);
  const [ableButton2, setAbleButton2] = useState(true);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [work_type, setWorktype] = useState("");
  const [serviceType, setServicetype] = useState("");
  const [id_c, setId_c] = useState("");
  const [wsedit, setWsEdit] = useState("");
  const [limit, setLimit] = useState("");
  const [error, setError] = useState(null);
  const [askDel, setAskDel] = useState(false);
  const [controlError, setControlError] = useState({
    name: false,
    description: false,
    address: false,
    date: false,
    time: false,
    competency: false,
    limit: false,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (refresh && ids) {
      fetch(API_URL + `services/` + ids, {
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .then(() => setRefresh(!refresh));
    }
  }, [ids, refresh]);

  useEffect(() => {
    if (type === "tutor" || type === "volunteers") {
      setAbleButton(true);
    }
    if (data) {
      const users = data.data.Users;
      const hasTargetUser = users.some((user) => user.id === id);
      if (hasTargetUser) {
        setAbleButton(true);
        setAbleButton2(false);
      }
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const closeEditWs = () => setShow(false);

  const deleteWs = () => {
    const reqop = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({
        name,
        description,
        date,
        time,
        work_type,
        serviceType,
        address,
        id_c,
        id_v: id,
        limit,
      }),
    };

    fetch(API_URL + "services/" + ids, reqop)
      .then((response) => {
        if (res.status === 401) {
          setToken(null);
          throw new Error("Token caducado");
        } else if (!res.ok) {
          setError(res.error);
          throw new Error("Error happened");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setRefresh(true));
    goTo("/myWork");
  };

  const handleSubmit = () => {
    const copycontrolError = {...controlError}
    copycontrolError.name = !wsedit.name || wsedit.name.trim() === " ";
    copycontrolError.description = !wsedit.description || wsedit.description.trim() === " ";
    copycontrolError.address = !wsedit.address || wsedit.address.trim() === " ";
    copycontrolError.date = !wsedit.date;
    copycontrolError.time = !wsedit.time;
    copycontrolError.competency = !wsedit.id_c || wsedit.id_c === "0";
    copycontrolError.limit = !wsedit.limit || parseInt(wsedit.limit) <= 0; //el type number me devuelve en numero como string, con el parseInt lo paso a integer y asi puedo hacer la comparacion mas compleja

    setControlError({ ...copycontrolError });
    if (Object.values(copycontrolError).some((el) => el === true)) {
      return;
    }

    const fdata = new FormData();
    fdata.append("name", wsedit.name);
    fdata.append("description", wsedit.description);
    fdata.append("date", wsedit.date);
    fdata.append("id", ids);
    fdata.append("time", wsedit.time);
    fdata.append("address", wsedit.address);
    fdata.append("id_c", wsedit.id_c);
    fdata.append("limit", wsedit.limit);
    fdata.append("file", wsedit.foto);

    const requested = {
      method: "PUT",
      headers: { authorization: token },
      body: fdata,
    };
    fetch(API_URL + `services`, requested)
      .then((res) => res.json())
      .catch((err) => err)
      .then((res) => {
        if (res.ok) {
          setRefresh(true);
          setShow(false);
        } else if (res.status === 401) {
          setShow(false);
          setToken(null);
          setError(res.error);
        } else {
          console.log("there was an error");
          setShow(false);
          setError(res.error);
        }
      })
      .catch((err) => setError(err));
  };

  const participate = () => {
    const id_u = id;
    const id_s = ids;

    const data = {
      id_u,
      id_s,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify(data),
    };

    fetch(API_URL + "usersServices", requestOptions)
      .then((response) => {
        if (res.status === 401) {
          setToken(null);
          throw new Error("Token caducado");
        } else if (!res.ok) {
          //esto lo pongo para que me entre si hay otro error que no sea el del token. si pusiera solo else entraria tbb cuando no hay ningun error
          setError(res.error);
          throw new Error("Error happened");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setRefresh(true));
  };

  const pressPart = () => {
    participate();
    setAbleButton(true);
    setAbleButton2(false);
  };
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const currentDate = new Date().toISOString().split("T")[0];
    if (selectedDate < currentDate) {
      alert("Please select a newer date.");
    } else {
      setWsEdit({ ...wsedit, date: selectedDate });
    }
  };

  const unparticipate = () => {
    const userId = id;
    const serviceId = ids;

    const data = {
      userId,
      serviceId,
    };

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify(data),
    };

    fetch(API_URL + "usersServices", requestOptions)
      .then((response) => {
        if (res.status === 401) {
          setToken(null);
          throw new Error("Token caducado");
        } else if (!res.ok) {
          setError(res.error);
          throw new Error("Error happened");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setRefresh(true));
  };

  const pressUnpart = () => {
    unparticipate();
    setAbleButton2(true);
    setAbleButton(false);
  };

  const askDelAccount = () => {
    setAskDel(true);
  };
  const askNo = () => {
    setAskDel(false);
  };

  let Clients2 =
    data &&
    data.data &&
    data.data.Users &&
    data.data.Users.map((el) => {
      return (
        <>
          <Link to={`/perfil/users/${el.id}`}>
            <Tooltip title={el.name} placement="top">
              <Avatar key={el.id} src={"http://localhost:5000/" + el.foto}>
                {el.name[0].toUpperCase()}
              </Avatar>
            </Tooltip>
          </Link>
        </>
      );
    });
  return (
    <>
      <div className="wholepage">
        <div className="infoservice">
          <div className="infoserv">
            <div style={{ width: "fit-content", margin: "auto" }}>
              <img
                className="wsimg"
                src={"http://localhost:5000/fotoServices/" + data.data.foto}
              />
            </div>
            <h1 className="wsname compename">
              <b>{data.data && data.data.name}</b>
            </h1>
            <p className="wsdesc">
              <b>Description:</b> {data.data && data.data.description}
            </p>
            <p className="wsdata">
              <b>Date:</b> {data.data && data.data.date}
            </p>
            <p>
              <b>At:</b> {data.data && data.data.time} h
            </p>
            <p>
              <b>Address:</b> {data.data && data.data.address}
            </p>
            <p>
              <b>Maximum number of participants:</b>{" "}
              {data.data && data.data.limit}
            </p>

            {token ? (
              <>
                {type === "volunteers" ? (
                  <>
                    {id === data.data.id_v ? (
                      <>
                      {data.data && new Date(`${data.data.date}T${data.data.time}`).getTime() > new Date().getTime() ?
                      <>
                        <div>
                          <Button
                            onClick={() => {
                              setShow(true);
                              setWsEdit({ ...data.data });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="delete-button-for-edit"
                            variant="danger"
                            size="m"
                            onClick={askDelAccount}
                          >
                            Delete
                          </Button>
                          {askDel ? (
                            <>
                              <div>
                                <br />
                                <b>Are you sure? </b>
                                <Button
                                  variant="danger"
                                  size="m"
                                  onClick={deleteWs}
                                >
                                  YES
                                </Button>
                                <Button
                                  className="delete-button-for-edit"
                                  variant="primary"
                                  size="m"
                                  onClick={askNo}
                                >
                                  NO
                                </Button>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <Modal show={show} onHide={closeEditWs}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit your Workshop</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form>
                              <div className="form-group">
                                <label>Workshop Name*</label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    controlError.name && "toAnswer"
                                  }`}
                                  value={wsedit.name}
                                  onChange={(e) =>
                                    setWsEdit({
                                      ...wsedit,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label>Description*</label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    controlError.description && "toAnswer"
                                  }`}
                                  value={wsedit.description}
                                  onChange={(e) =>
                                    setWsEdit({
                                      ...wsedit,
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label>Address*</label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    controlError.address && "toAnswer"
                                  }`}
                                  value={wsedit.address}
                                  onChange={(e) =>
                                    setWsEdit({
                                      ...wsedit,
                                      address: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label>Date*</label>
                                <input
                                  type="date"
                                  className={`form-control ${
                                    controlError.date && "toAnswer"
                                  }`}
                                  value={wsedit.date}
                                  onChange={handleDateChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>Time*</label>
                                <input
                                  type="time"
                                  className={`form-control ${
                                    controlError.time && "toAnswer"
                                  }`}
                                  value={wsedit.time}
                                  onChange={(e) =>
                                    setWsEdit({
                                      ...wsedit,
                                      time: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <label>Competency*</label>
                                <select
                                  className={`form-control ${
                                    controlError.competency && "toAnswer"
                                  }`}
                                  value={wsedit.id_c}
                                  onChange={(e) =>
                                    setWsEdit({
                                      ...wsedit,
                                      id_c: e.target.value,
                                    })
                                  }
                                >
                                  <option value="0">
                                    --Select Competence--
                                  </option>
                                  <option value="1">Asertividad</option>
                                  <option value="2">Asistencia</option>
                                  <option value="3">Comunicacion</option>
                                  <option value="4">Fiabilidad</option>
                                  <option value="5">Adaptabilidad</option>
                                </select>
                              </div>
                              <div>
                                <label>Participant limit*</label>
                                {controlError.limit && (
                                  <small style={{ color: "red" }}>
                                    The number of participants must be bigger
                                    than 0
                                  </small>
                                )}
                                <input
                                  type="number"
                                  className={`form-control ${
                                    controlError.limit && "toAnswer"
                                  }`}
                                  value={wsedit.limit}
                                  onChange={(e) =>
                                    setWsEdit({
                                      ...wsedit,
                                      limit: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <label>
                                <p>Image:</p>
                                <input
                                  type="file"
                                  accept="image/png, image/gif, image/jpeg, image/jpg"
                                  onChange={(e) => {
                                    setWsEdit({
                                      ...wsedit,
                                      foto: e.target.files[0],
                                    });
                                  }}
                                />
                              </label>
                              {Object.values(controlError).some(
                                (el) => el === true
                              ) && (
                                <p style={{ color: "red" }}>
                                  *All the fields must be fullfilled.
                                </p>
                              )}
                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              className="btn btn-primary"
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={closeEditWs}
                            >
                              Cancel
                            </button>
                          </Modal.Footer>
                        </Modal>
                        </> : 
                        <div>
                        <br />
                        <p className="workshopended">
                          <i>This workshop has expired</i>
                        </p>
                      </div>}
                      </>
                    ) : (
                      <>
                        <div>
                          <br />
                          <p className="workshopended">
                            <i>You did not create this workshop</i>
                          </p>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {data.data &&
                    new Date(data.data.date + " " + data.data.time).getTime() <
                      new Date().getTime() ? (
                      <>
                        <div>
                          <br />
                          <p className="workshopended">
                            <i>This workshop has expired</i>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {data.data.Users.length === data.data.limit ? (
                          <>
                            {data.data.Users.some((user) => user.id === id) ? (
                              <>
                                <Button
                                  variant="primary"
                                  disabled={ableButton}
                                  onClick={pressPart}
                                >
                                  Participate
                                </Button>
                                <Button
                                  className="participateornot"
                                  variant="danger"
                                  disabled={ableButton2}
                                  onClick={pressUnpart}
                                >
                                  Unparticipate
                                </Button>
                              </>
                            ) : (
                              <>
                                <br />
                                <p className="workshopended">
                                  <i>limit of participants reached</i>
                                </p>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <Button
                              variant="primary"
                              disabled={ableButton}
                              onClick={pressPart}
                            >
                              Participate
                            </Button>
                            <Button
                              className="participateornot"
                              variant="danger"
                              disabled={ableButton2}
                              onClick={pressUnpart}
                            >
                              Unparticipate
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <p>If you want to participate, please:</p>
                <div className="buttonparticipant">
                  <Link to="/signSelect">
                    <Button>Log in</Button>
                  </Link>{" "}
                  or{" "}
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
          <Link className="servicesAgain" to="/services">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to browse workshops
          </Link>
        </div>

        <div className="side">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={token ? `/perfil/volunteers/${data.data.Volunteer.id}` : "#"}
          >
            <Tooltip
              title={token ? "" : "Log in or register to know more"}
              placement="top"
            >
              <div className={token ? "wsbadges" : "wsbadges LoginToSeeMore"}>
                <h2>
                  <b>Organised by:</b>
                </h2>
                {data.data && data.data.Volunteer && (
                  <div className="volunteerthings">
                    <div className="imagevolunteer">
                      <Avatar
                        src={
                          "http://localhost:5000/" + data.data.Volunteer.foto
                        }
                        size={140}
                        style={{ backgroundColor: "purple" }}
                      >
                        <span style={{ fontSize: "50px" }}>
                          {data.data.Volunteer.name[0].toUpperCase()}
                        </span>
                      </Avatar>
                    </div>
                    <div className="infovolunteer">
                      <h5 className="compename">
                        <b>{data.data.Volunteer.name}</b>
                      </h5>
                      <p className="text-muted">
                        {data.data.Volunteer.role === 3
                          ? "Therapist"
                          : "Arthist"}
                      </p>
                      <p style={{ textAlign: "center" }}>
                        {data.data.Volunteer.description && (
                          <>" {data.data.Volunteer.description} "</>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Tooltip>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/about/support"
          >
            <div className="wsbadges">
              <h2>
                <b>Competency you will get:</b>
              </h2>
              {data.data && data.data.Competency && (
                <>
                  <p className="compename">{data.data.Competency.name}</p>
                  <p>{data.data.Competency.description}</p>
                </>
              )}
            </div>{" "}
          </Link>
          {token && (
            <div className="wsclients">
              <h2>
                <b>Participants:</b>
              </h2>
              {data.data && data.data.Users && data.data.Users.length ? (
                <div className="avatarsv">
                  <Avatar.Group
                    maxCount={2}
                    size={50}
                    maxStyle={{
                      color: "white",
                      backgroundColor: "#f5d389",
                      cursor: "pointer",
                    }}
                  >
                    {Clients2}
                  </Avatar.Group>
                </div>
              ) : (
                <p>There are no users participating at the moment.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
    </>
  );
}

export default IndService;
