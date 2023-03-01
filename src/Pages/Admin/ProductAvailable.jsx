import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Container, Table } from "react-bootstrap";
import { ADD_PRODUCTSAVAILABLE, LOAD_PRODUCTSAVAILABLE, UPDATE_PRODUCTSAVAILABLE } from "../../actionTypes";
import ProductAvailableModal from "../../Components/ProductAvailable/ProductAvailableModal";
import ProductAvailableTr from "../../Components/ProductAvailable/ProductAvailableTr";

import { ProductAvailableContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function ProductAvailable() {
  const [showModal, setShowModal] = useState(false);
  const { productAvailableValue, productAvailableDispatch } = useContext(ProductAvailableContext);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/productsAvailable`)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          productAvailableDispatch({
            type: LOAD_PRODUCTSAVAILABLE,
            payload: data,
          });

          toast.success(message);
        } else {
          toast.error(message);
        }
      })
      .catch();
  }, []);

  const handleShowModal = () => {
    setShowModal((prvSt) => !prvSt);
  };

  const saveProductAvailable = (data) => {
    axios
      .post(`${BACKEND_URL}/productsAvailable`, data)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          productAvailableDispatch({
            type: ADD_PRODUCTSAVAILABLE,
            payload: data,
          });

          toast.success(message);
          handleShowModal();
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        toast.error("Server Error!");
        console.log(err);
      });
  };


  const updateProductAvailable = (data, id) => {
    axios
      .put(`${BACKEND_URL}/productsAvailable/${id}`, data)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          
          productAvailableDispatch({
            type: UPDATE_PRODUCTSAVAILABLE,
            payload: data
          })

          toast.success(message);
          handleShowModal();
        } else {
          toast.error(message);
        }

      })
      .catch((err) => {
        toast.error("Server Error!");
        console.log(err);
      });
  }

  return (
    <Container className="mx-auto">
      <div className="clearfix my-2">
        <h1 className="float-start">ProductAvailable</h1>
        <Button
          onClick={handleShowModal}
          className="float-end"
          variant="primary"
        >
          Add ProductAvailable
        </Button>
      </div>

      <hr />

      {productAvailableValue.isLoaded ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product_id</th>
              <th>Colour</th>
              <th>Quantity</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {productAvailableValue.productsAvailable.map((prodAvailable, index) => (
              <ProductAvailableTr
                handleShowModal={handleShowModal}
                productAvailable={prodAvailable}
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

      <ProductAvailableModal
        show={showModal}
        handleClose={handleShowModal}
        saveProductAvailable={saveProductAvailable}
        updateProductAvailable={updateProductAvailable}
      />
    </Container>
  );
}

export default ProductAvailable;