import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  ADD_MATERIALS,
  LOAD_MATERIALS,
  UPDATE_MATERIALS,
} from "../../actionTypes";
import MaterialModal from "../../Components/Material/MaterialModal";
import MaterialTr from "../../Components/Material/MaterialTr";
import { MaterialContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function Material() {
  const [showModal, setShowModal] = useState(false);
  const { materialInfo, materialDispatch } = useContext(MaterialContext);

  useEffect(() => {
    if (!materialInfo.isLoaded) {
      axios
        .get(`${BACKEND_URL}/materials`)
        .then((res) => {
          const { status, data } = res;
          if (status) {
            materialDispatch({
              type: LOAD_MATERIALS,
              payload: data,
            });

            toast.success("Material loaded");
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

  const saveMaterial = (data) => {
    axios
      .post(`${BACKEND_URL}/materials`, data)
      .then((res) => {
        const { status, data } = res;
        if (status) {
          materialDispatch({
            type: ADD_MATERIALS,
            payload: data,
          });

          toast.success("Material added successfully");
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

  const updateMaterial = (data) => {
    axios
      .put(`${BACKEND_URL}/materials`, data)
      .then((res) => {
        const { status, data } = res;
        if (status) {
          materialDispatch({
            type: UPDATE_MATERIALS,
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
  console.log("te matinfo : ", materialInfo);
  return (
    <Container className="mx-auto">
      <div className="clearfix my-2">
        <h1 className="float-start">Material</h1>
        <Button
          onClick={handleShowModal}
          className="float-end"
          variant="primary">
          Add material
        </Button>
      </div>

      <hr />

      {materialInfo?.isLoaded ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materialInfo?.materials?.map((mat, index) => (
              <MaterialTr
                handleShowModal={handleShowModal}
                material={mat}
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

      <MaterialModal
        show={showModal}
        handleClose={handleShowModal}
        saveMaterial={saveMaterial}
        updateMaterial={updateMaterial}
      />
    </Container>
  );
}

export default Material;
