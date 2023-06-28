import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  ADD_SUPPLIERS,
  LOAD_SUPPLIERS,
  UPDATE_SUPPLIERS,
} from "../../actionTypes";
import { BACKEND_URL } from "../../utils";
import SupplierTr from "../../Components/Supplier/SupplierTr";

import SupplierModal from "../../Components/Supplier/SupplierModal";
import { SupplierContext } from "../../contexts";

function Supplier() {
  const [showModal, setShowModal] = useState(false);
  const { supplierInfo, supplierDispatch } = useContext(SupplierContext);

  useEffect(() => {
    if (!supplierDispatch.isLoaded) {
      axios
        .get(`${BACKEND_URL}/supplier`)
        .then((res) => {
          const { status, data } = res;

          console.log("tes supplier load api:", res);

          if (status) {
            supplierDispatch({
              type: LOAD_SUPPLIERS,
              payload: data,
            });

            toast.success("Supplier loaded");
          } else {
            toast.error("Something wen wrong");
          }
        })
        .catch();
    }
  }, [supplierDispatch]);

  const handleShowModal = () => {
    setShowModal((prvSt) => !prvSt);
  };

  const saveSupplier = (data) => {
    axios
      .post(`${BACKEND_URL}/supplier`, data)
      .then((res) => {
        const { status, data } = res;
        if (status) {
          supplierDispatch({
            type: ADD_SUPPLIERS,
            payload: data,
          });

          toast.success("Supplier added successfully");
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

  const updateSupplier = (data) => {
    console.log("test upd cat :", data);
    axios
      .put(`${BACKEND_URL}/supplier`, data)
      .then((res) => {
        const { status, data } = res;
        console.log("test upd sup 2:", res);
        if (status) {
          supplierDispatch({
            type: UPDATE_SUPPLIERS,
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
        <h1 className="float-start">Supplier</h1>
        <Button
          onClick={handleShowModal}
          className="float-end"
          variant="primary">
          Add Supplier
        </Button>
      </div>

      <hr />

      {supplierInfo.isLoaded ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Country</th>
              <th>Company Name</th>
              <th>Contact Name</th>
              <th>Contact Title</th>
              <th>Address</th>
              <th>Region</th>
              <th>Postal code</th>
              <th>Phone</th>
              <th>Fax</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplierInfo.suppliers.map((supplier, index) => (
              <SupplierTr
                handleShowModal={handleShowModal}
                supplier={supplier}
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

      <SupplierModal
        show={showModal}
        handleClose={handleShowModal}
        saveSupplier={saveSupplier}
        updateSupplier={updateSupplier}
      />
    </Container>
  );
}

export default Supplier;
