import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { ADD_SIZES, LOAD_SIZES, UPDATE_SIZES } from "../../actionTypes";
import SizeModal from "../../Components/Size/SizeModal";
import SizeTr from "../../Components/Size/SizeTr";
import { SizeContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function Size() {
  const [showModal, setShowModal] = useState(false);
  const { sizeInfo, sizeDispatch } = useContext(SizeContext);

  useEffect(() => {
    if (!sizeInfo.isLoaded) {
      axios
        .get(`${BACKEND_URL}/sizes`)
        .then((res) => {
          const { status, data } = res;

          console.log("tes size load api:", res);

          if (status) {
            sizeDispatch({
              type: LOAD_SIZES,
              payload: data,
            });

            toast.success("Size loaded");
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch();
    }
  }, [sizeDispatch, sizeInfo.isLoaded]);

  const handleShowModal = () => {
    setShowModal((prvSt) => !prvSt);
  };

  const saveSize = (data) => {
    axios
      .post(`${BACKEND_URL}/sizes`, data)
      .then((res) => {
        const { status, data } = res;
        if (status) {
          sizeDispatch({
            type: ADD_SIZES,
            payload: data,
          });

          toast.success("Size added successfully");
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

  const updateSize = (data) => {
    console.log("test upd size :", data);
    axios
      .put(`${BACKEND_URL}/sizes`, data)
      .then((res) => {
        const { status, data } = res;
        console.log("test upd size 2:", res);
        if (status) {
          sizeDispatch({
            type: UPDATE_SIZES,
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
        <h1 className="float-start">Size</h1>
        <Button
          onClick={handleShowModal}
          className="float-end"
          variant="primary">
          Add size
        </Button>
      </div>

      <hr />

      {sizeInfo.isLoaded ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sizeInfo?.sizes?.map((size, index) => (
              <SizeTr
                handleShowModal={handleShowModal}
                size={size}
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

      <SizeModal
        show={showModal}
        handleClose={handleShowModal}
        saveSize={saveSize}
        updateSize={updateSize}
      />
    </Container>
  );
}

export default Size;
