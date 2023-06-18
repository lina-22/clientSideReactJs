import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { ADD_COLORS, LOAD_COLORS, UPDATE_COLORS } from "../../actionTypes";
import ColorModal from "../../Components/Color/ColorModal";
import ColorTr from "../../Components/Color/ColorTr";
import { ColorContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

import { AuthContext } from "../../contexts";

function Color() {
  const [showModal, setShowModal] = useState(false);
  const { colorInfo, colorDispatch } = useContext(ColorContext);

  useEffect(() => {
    if (!colorInfo.isLoaded) {
      axios
        .get(`${BACKEND_URL}/colours`)
        .then((res) => {
          const { status, data } = res;

          console.log("tes color load api:", res);

          if (status) {
            colorDispatch({
              type: LOAD_COLORS,
              payload: data,
            });

            toast.success("Color loaded");
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch();
    }
  }, []);

  const handleShowModal = () => {
    setShowModal((prvSt) => !prvSt);
  };

  const saveColor = (data) => {
    axios
      .post(`${BACKEND_URL}/colours`, data)
      .then((res) => {
        const { status, data } = res;
        if (status) {
          colorDispatch({
            type: ADD_COLORS,
            payload: data,
          });

          toast.success("Color added successfully");
          handleShowModal();
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Server Error!");
        console.log(err);
      });
  };

  const updateColor = (data) => {
    console.log("test upd color :", data);
    axios
      .put(`${BACKEND_URL}/colours`, data)
      .then((res) => {
        const { status, data } = res;
        console.log("test upd color 2:", res);
        if (status) {
          colorDispatch({
            type: UPDATE_COLORS,
            payload: data,
          });

          toast.success("Successfully updated");
          handleShowModal();
        } else {
          toast.error("Somesthing went wrong");
        }
      })
      .catch((err) => {
        toast.error("Server Error!");
        console.log(err);
      });
  };

  return (
    <Container className="mx-auto">
      <div className="clearfix my-2">
        <h1 className="float-start">Color</h1>
        <Button
          onClick={handleShowModal}
          className="float-end"
          variant="primary">
          Add color
        </Button>
      </div>

      <hr />

      {colorInfo.isLoaded ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {colorInfo.colors.map((cat, index) => (
              <ColorTr
                handleShowModal={handleShowModal}
                color={cat}
                key={index}
              />
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="text-center my-5">
          <h4>Loading..............</h4>
        </div>
      )}

      <ColorModal
        show={showModal}
        handleClose={handleShowModal}
        saveColor={saveColor}
        updateColor={updateColor}
      />
    </Container>
  );
}

export default Color;
