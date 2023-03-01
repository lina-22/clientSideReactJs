import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Container, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  ADMIN_RESERVATION_STATUS_CHANGE,
  LOAD_ADMIN_RESERVATIONS,ADMIN_RESERVATION_DELETE
} from "../../actionTypes";
import { AdminReservationContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function Reservations() {
  const { adminReservationValue, adminReservationDispatch } = useContext(
    AdminReservationContext
  );

  const [showModal, setShowModal] = useState(false);
  const [targetReservation, setTargetReservation] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!adminReservationValue.isLoaded) {
      axios
        .get(`${BACKEND_URL}/reservations`)
        .then((res) => {
          const { status, message, data } = res.data;

          if (status) {
            adminReservationDispatch({
              type: LOAD_ADMIN_RESERVATIONS,
              payload: data,
            });

            toast.success(message);
          } else {
            toast.error(message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something Went Wrong!!");
        });
    }
  }, []);

  const handleClose = (resv = null) => {
    setShowModal((prevs) => !prevs);
    if (resv) {
      setTargetReservation(resv);
      setStatus(resv.status);
    }else{
      setStatus("");
    }
  };

  const onChangeHandler = (e) => {
    let value = e.target.value;
    setStatus(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .put(`${BACKEND_URL}/reservations/${targetReservation.id}`, { status })
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          adminReservationDispatch({
            type: ADMIN_RESERVATION_STATUS_CHANGE,
            payload: data,
          });

          toast.success(message);
          handleClose();
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong!");
      });
  };
  const onDeleteHandler = (id) => {
    if (window.confirm("Are You Sure??")) {
      axios
        .delete(`${BACKEND_URL}/reservations/${id}`)
        .then((res) => {
          const { status, data, message } = res.data;
          if (status) {
            adminReservationDispatch({
              type: ADMIN_RESERVATION_DELETE,
              payload: id,
            });

            toast.success(message);
          } else {
            toast.error(message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something Went Wrong!");
        });
    }
  };
  return (
    <>
      <Container className="mx-auto">
        <div className="clearfix my-2">
          <h1 className="float-start">Reservations</h1>
        </div>
        <hr />
        {adminReservationValue.isLoaded ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Reference</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Expire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminReservationValue.reservations.map((resv, index) => (
                <tr key={index}>
                  <td>{resv.id}</td>
                  <td>{resv.reference}</td>
                  <td>{resv.status}</td>
                  <td>{moment(resv.created_at).format("MMM DD, YYYY")}</td>
                  <td>{moment(resv.expire_date).format("MMM DD, YYYY")}</td>
                  <td>
                    <button
                      onClick={() => handleClose(resv)}
                      className="btn btn-sm px-4 py-2 btn-info my-2 mx-2"
                    >
                      Change Status
                    </button>
                    <button onClick={() => onDeleteHandler(resv.id)} className="btn btn-sm px-4 py-2 btn-danger my-2 mx-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center my-5">
            <h4>Loading..............</h4>
          </div>
        )}
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="product_id">
              <Form.Label>Reservations Status</Form.Label>
              <select
                onChange={onChangeHandler}
                name="status"
                className="form-control"
                defaultValue={status}
              >
                <option value="">Select One</option>
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
              <div className="w-100 text-center">
                <button className="my-3 px-4 mx-auto py-2 btn btn-success">
                  Change
                </button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Reservations;