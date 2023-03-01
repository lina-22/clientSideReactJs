import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { LOAD_CATEGORIES, REMOVE_PRODUCTS, UPDATE_PRODUCTS } from "../../actionTypes";
import { CategoryContext, ProductContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function AttatchCategoryModal({ show, handleClose }) {
  const { categoryValue, categoryDispatch } = useContext(CategoryContext);
  const { productValue, productDispatch } = useContext(ProductContext);

  const [selectedCats, setSelectedCats] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryValue.isLoaded) {
      axios
        .get(`${BACKEND_URL}/categories`)
        .then((res) => {
          const { status, data, message } = res.data;
          if (status) {
            categoryDispatch({
              type: LOAD_CATEGORIES,
              payload: data,
            });
          } else {
            toast.error(message);
          }
        })
        .catch();
    }
  }, []);

  const onChangeHandler = (e) => {
    setSelectedCats(e);
  };

  const submitHandler = () => {
    if (selectedCats.length <= 0) {
      toast.error("Please Select a Category");
    } else {
      setLoading(true);

      let categories = selectedCats.map((cat) => cat.value);

      axios
        .post(
          `${BACKEND_URL}/products/${productValue.selectedProduct.id}/attach_category`,
          { categories }
        )
        .then((res) => {
          let { status, message, data } = res.data;
          if (status) {
            productDispatch({
              type: UPDATE_PRODUCTS,
              payload: data,
            });
            toast.success(message);
            handleClose();
          } else {
            toast.error(message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something Went Wrong!!");
          setLoading(false);
        });
    }
  };

  const resetState = () => {
    productDispatch({type: REMOVE_PRODUCTS})
    setLoading(false);
    setSelectedCats([]);
  }

  return (
    <Modal show={show} onHide={handleClose} onExit={resetState}>
      <Modal.Header closeButton>
        <Modal.Title>Attatch Category</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-2">
        <Select
          onChange={onChangeHandler}
          options={categoryValue.categories.map((cat) => {
            return {
              value: cat.id,
              label: cat.name,
            };
          })}
          isMulti={true}
          defaultValue={
            productValue.selectedProduct &&
            productValue.selectedProduct.categories.map((cat) => {
              return {
                value: cat.id,
                label: cat.name,
              };
            })
          }
        />

        <Button
          variant="primary"
          className="mt-3 py-2 px-5"
          onClick={submitHandler}
          disabled={isLoading}
        >
           { isLoading ? "Loading..." : "Attatch" }
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default AttatchCategoryModal;