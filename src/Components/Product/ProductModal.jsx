import { useContext, useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { REMOVE_PRODUCTS } from "../../actionTypes";
import { ProductContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";
import axios from "axios";
import { LOAD_SUPPLIERS } from "../../actionTypes";

import { SupplierContext } from "../../contexts";
import { toast } from "react-toastify";

function ProductModal({ show, handleClose, saveProduct, updateProduct }) {
  const { productValue, productDispatch } = useContext(ProductContext);
  const [state, setState] = useState({
    isLoading: false,
    name: "",
    description: "",
    price: "",
    discount: "",
    supplierId: "",
    productForSaleReqDto: [
      {
        qty: 12,
        skuReference: "test",
        categoryId: 1,
        colourId: 1,
        materialId: 1,
        sizeId: 1,
      },
      {
        qty: 14,
        skuReference: "test 2",
        categoryId: 1,
        colourId: 1,
        materialId: 1,
        sizeId: 1,
      },
    ],
  });

  const [stock, setStock] = useState({
    qty: "",
    skuReference: "",
    categoryId: "",
    colourId: "",
    materialId: "",
    sizeId: "",
  });

  const imgRef = useRef();

  useEffect(() => {
    if (productValue.selectedProduct) {
      setState((prvSt) => {
        return {
          ...prvSt,
          name: productValue.selectedProduct.name,
          is_featured: productValue.selectedProduct.is_featured,
          price: productValue.selectedProduct.price,
          discount: productValue.selectedProduct.discount,
          description: productValue.selectedProduct.description,
        };
      });
    }
  }, [show]);

  const onChangeHandler = (e) => {
    setState((prvSt) => {
      if (e.target.type == "checkbox") {
        return {
          ...prvSt,
          [e.target.name]: e.target.checked ? 1 : 0,
        };
      }

      if (e.target.type == "file") {
        return {
          ...prvSt,
          [e.target.name]: e.target.files[0],
        };
      }

      return {
        ...prvSt,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onChangeIdHandler = (e) => {
    console.log("test e here id :", e);
    // setState((prvSt) => {

    //   return {
    //     ...prvSt,
    //     [e.target.name]: e.target.value,
    //   };
    // });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setState((prevSt) => ({ ...prevSt, isLoading: true }));

    const formData = new FormData();

    formData.append("name", state.name);
    formData.append("price", state.price);
    formData.append("discount", state.discount);
    formData.append("image", state.image);
    formData.append("description", state.description);
    formData.append("is_featured", state.is_featured);

    if (productValue.selectedProduct) {
      formData.append("_method", "PUT");
      updateProduct(formData, productValue.selectedProduct.id);
    } else {
      saveProduct(formData);
    }
  };

  const resetState = () => {
    productDispatch({ type: REMOVE_PRODUCTS });
    imgRef.current.value = null;

    setTimeout(() => {
      setState({
        name: "",
        is_featured: 0,
        price: "",
        discount: "",
        image: "",
        description: "",
        isLoading: false,
      });
    }, 5);
  };

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
          } else {
            toast.error("Something wen wrong while loading supplier");
          }
        })
        .catch();
    }
  }, []);

  return (
    <Modal show={show} onHide={handleClose} onExit={resetState}>
      <Modal.Header closeButton>
        <Modal.Title>
          {productValue.selectedProduct ? "Update Product" : "Add New Product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="text"
              name="name"
              value={state.name}
              placeholder="ex : t-shirt"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="number"
              name="price"
              value={state.price}
              placeholder="ex : 50.30"
              disabled={state.isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="number"
              name="description"
              value={state.description}
              placeholder="ex : long sleeve"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="discount">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="number"
              name="discount"
              value={state.discount}
              placeholder="10%"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="file"
              name="image"
              placeholder="Select Image"
              disabled={state.isLoading}
              ref={imgRef}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="supplier">
            <Form.Label>Supplier</Form.Label>
            <Form.Control
              onChange={onChangeIdHandler}
              type="text"
              name="supplier"
              value={state.supplier}
              placeholder="supplier"
              disabled={state.isLoading}
            />
          </Form.Group> */}

          {/* <Form.Group className="mb-3" controlId="is_featured">
            <Form.Check
              type="checkbox"
              name="is_featured"
              onClick={onChangeHandler}
              label="Is Featured"
              checked={state.is_featured}
              disabled={state.isLoading}
            />
          </Form.Group> */}
          <Button variant="primary" type="submit" disabled={state.isLoading}>
            {state.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
        <Form>
          <Form.Select aria-label="supplier">
            <option>Supplier</option>
            {supplierInfo.suppliers.length
              ? supplierInfo.suppliers.map((supplier, index) => {
                  return (
                    <option key={index} value={supplier.supplierId}>
                      {supplier.companyName}
                    </option>
                  );
                })
              : null}
          </Form.Select>
        </Form>
        <br />
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;
