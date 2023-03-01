import { useContext, useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { REMOVE_PRODUCTS } from "../../actionTypes";
import { ProductContext } from "../../contexts";

function ProductModal({ show, handleClose, saveProduct, updateProduct }) {
  const {productValue, productDispatch} = useContext(ProductContext);
  const [state, setState] = useState({
    name: "",
    is_featured: 0,
    price: "",
    discount: "",
    image: "",
    description: "",
    isLoading: false,
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
        isLoading: false
      });
    }, 5);
  };

  return (
    <Modal show={show} onHide={handleClose} onExit={resetState}>
      <Modal.Header closeButton>
        <Modal.Title>{productValue.selectedProduct ? "Update Product" : "Add New Product"}</Modal.Title>
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
              placeholder="Name"
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
              placeholder="price"
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
              placeholder="discount"
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
         

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="text"
              name="description"
              value={state.description}
              placeholder="description"
              disabled={state.isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="is_featured">
            <Form.Check
              type="checkbox"
              name="is_featured"
              onClick={onChangeHandler}
              label="Is Featured"
              checked={state.is_featured}
              disabled={state.isLoading}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={state.isLoading}>
            {state.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;
