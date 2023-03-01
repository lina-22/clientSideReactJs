import { useContext, useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { REMOVE_CATEGORIES } from "../../actionTypes";
import { CategoryContext } from "../../contexts";

function CategoryModal({ show, handleClose, saveCategory, updateCategory }) {
  const { categoryValue, categoryDispatch } = useContext(CategoryContext);
  const [state, setState] = useState({
    image: "",/*this line should delete if i cut cat images */
    name: "",
    is_featured: 0,/*this line should delete if i cut cat images */
    isLoading: false,
  });

  const imgRef = useRef();

  useEffect(() => {
    if (categoryValue.selectedCategory) {
      setState((prvSt) => {
        return {
          ...prvSt,
          name: categoryValue.selectedCategory.name,
          is_featured: categoryValue.selectedCategory.is_featured,/*this line should delete if i cut cat images */
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

    formData.append("image", state.image);/*this line should delete if i cut cat images */

    formData.append("name", state.name);
    formData.append("is_featured", state.is_featured);/*this line should delete if i cut cat images */

    if (categoryValue.selectedCategory) {
      formData.append("_method", "PUT");
      updateCategory(formData, categoryValue.selectedCategory.id);
    } else {
      saveCategory(formData);
    }
  };

  const resetState = () => {
    categoryDispatch({ type: REMOVE_CATEGORIES });
    imgRef.current.value = null;

    setTimeout(() => {
      setState({
        image: "",/*this line should delete if i cut cat images */
        name: "",
        is_featured: 0,/*this line should delete if i cut cat images */
        isLoading: false,
      });
    }, 5);
  };

  return (
    <Modal show={show} onHide={handleClose} onExit={resetState}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          {/* this line should delete if i cut cat images   */}
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
          <Form.Group className="mb-3" controlId="is_featured">
            <Form.Check
              type="checkbox"
              name="is_featured"
              onChange={onChangeHandler}
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

export default CategoryModal;
