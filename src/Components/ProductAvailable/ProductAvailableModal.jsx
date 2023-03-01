import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { LOAD_PRODUCTS, REMOVE_PRODUCTSAVAILABLE } from "../../actionTypes";
import { ProductAvailableContext, ProductContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function ProductAvailableModal({
  show,
  handleClose,
  updateProductAvailable,
  saveProductAvailable,
}) {
  const { productAvailableValue, productAvailableDispatch } = useContext(
    ProductAvailableContext
  );
  const { productValue, productDispatch } = useContext(ProductContext);
  const [state, setState] = useState({
    product: {
      value: null,
      name: "",
    },
    colour: "",
    quantity: 0,
    size: "",
  });

  const imgRef = useRef();

  useEffect(() => {
    if (productAvailableValue.selectedProductAvailable) {
      setState((prvSt) => {

        let product = productValue.products.find(prod => prod.id === productAvailableValue.selectedProductAvailable
          .product_id)
    
        return {
          ...prvSt,
          product:{
            value: product.id,
            label: product.name
          },
          colour: productAvailableValue.selectedProductAvailable.colour,
          quantity: productAvailableValue.selectedProductAvailable.quantity,
          size: productAvailableValue.selectedProductAvailable.size,
        };
      });
    }

    if (!productValue.isLoaded) {
      axios
        .get(`${BACKEND_URL}/products`)
        .then((res) => {
          const { status, data, message } = res.data;
          if (status) {
            productDispatch({
              type: LOAD_PRODUCTS,
              payload: data,
            });
          } else {
            toast.error(message);
          }
        })
        .catch();
    }
  }, [show]);

  const onChangeHandler = (e) => {
    setState((prvSt) => {
      return {
        ...prvSt,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSelectChangeHandler = (e) => {
    setState((prvSt) => {
      return {
        ...prvSt,
        product: e,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setState((prevSt) => ({ ...prevSt, isLoading: true }));

    const formData = {
      product_id: state.product.value,
      colour: state.colour,
      size: state.size,
      quantity: state.quantity,
    };

    if (productAvailableValue.selectedProductAvailable) {
      
      updateProductAvailable(
        formData,
        productAvailableValue.selectedProductAvailable.id
      );
    } else {
      saveProductAvailable(formData);
    }
  };

  const resetState = () => {
    productAvailableDispatch({ type: REMOVE_PRODUCTSAVAILABLE });

    setTimeout(() => {
      setState({
        product: {
          value: null,
          name: "",
        },
        colour: "",
        quantity: 0,
        size: 0,
        isLoading: false,
      });
    }, 5);
  };

  const getDefaultValue = () => {
    if(productAvailableValue.selectedProductAvailable){
      let product = productValue.products.find(prod => prod.id === productAvailableValue.selectedProductAvailable
        .product_id)
  
        return {
          value: product.id,
          label: product.name
        }
    }

    return {
      value: "",
      label: ""
    }
  
  }

  return (
    <Modal show={show} onHide={handleClose} onExit={resetState}>
      <Modal.Header closeButton>
        <Modal.Title>Add New ProductAvailable</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="product_id">
            <Form.Label>Product</Form.Label>
            <Select
              onChange={onSelectChangeHandler}
              options={productValue.products.map((prod) => {
                return {
                  value: prod.id,
                  label: prod.name,
                };
              })}
              defaultValue={getDefaultValue()}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="colour">
            <Form.Label>Colour</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="text"
              name="colour"
              value={state.colour}
              placeholder="colour"
              disabled={state.isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="number"
              name="quantity"
              value={state.quantity}
              placeholder="quantity"
              disabled={state.isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="size">
            <Form.Label>Size</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="text"
              name="size"
              value={state.size}
              placeholder="size"
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

export default ProductAvailableModal;
