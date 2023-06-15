import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  ADD_PRODUCTS,
  LOAD_PRODUCTS,
  UPDATE_PRODUCTS,
} from "../../actionTypes";
import AttatchCategoryModal from "../../Components/Product/AttachCategoryModal";
import ProductModal from "../../Components/Product/ProductModal";
import ProductTr from "../../Components/Product/ProductTr";
import { ProductContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function Product() {
  const [showModal, setShowModal] = useState(false);
  const [showAttatch, setShowAttatch] = useState(false);
  const { productValue, productDispatch } = useContext(ProductContext);

  useEffect(() => {
    if (!productValue.isLoaded) {
      axios
        .get(`${BACKEND_URL}/products`)
        .then((res) => {
          console.log(res.data);
          const { status, data, message } = res.data;
          if (status) {
            productDispatch({
              type: LOAD_PRODUCTS,
              payload: data,
            });

            toast.success(message);
          } else {
            toast.error(message);
          }
        })
        .catch();
    }
  }, []);

  const handleShowModal = () => {
    setShowModal((prvSt) => !prvSt);
  };

  const handleAttatchModal = () => {
    setShowAttatch((prvSt) => !prvSt);
  };

  const saveProduct = (data) => {
    axios
      .post(`${BACKEND_URL}/products`, data)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          productDispatch({
            type: ADD_PRODUCTS,
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

  const updateProduct = (data, id) => {
    axios
      .post(`${BACKEND_URL}/products/${id}`, data)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          productDispatch({
            type: UPDATE_PRODUCTS,
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

  return (
    <Container className="mx-auto">
      <div className="clearfix my-2">
        <h1 className="float-start">Product</h1>
        <Button
          onClick={handleShowModal}
          className="float-end"
          variant="primary">
          Add Product
        </Button>
      </div>

      <hr />

      {productValue.isLoaded ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>is_featured</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Image</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productValue.products.map((prod, index) => (
              <ProductTr
                handleShowModal={handleShowModal}
                handleAttatchModal={handleAttatchModal}
                product={prod}
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

      <ProductModal
        show={showModal}
        handleClose={handleShowModal}
        saveProduct={saveProduct}
        updateProduct={updateProduct}
      />
      <AttatchCategoryModal
        show={showAttatch}
        handleClose={handleAttatchModal}
      />
    </Container>
  );
}

export default Product;
