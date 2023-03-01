import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  ADD_CATEGORIES,
  LOAD_CATEGORIES,
  UPDATE_CATEGORIES,
} from "../../actionTypes";
import CategoryModal from "../../Components/Category/CategoryModal";
import CategoryTr from "../../Components/Category/CategoryTr";
import { CategoryContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function Category() {
  const [showModal, setShowModal] = useState(false);
  const { categoryValue, categoryDispatch } = useContext(CategoryContext);

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

  const saveCategory = (data) => {
    axios
      .post(`${BACKEND_URL}/categories`, data)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          categoryDispatch({
            type: ADD_CATEGORIES,
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

  const updateCategory = (data, id) => {
    axios
      .post(`${BACKEND_URL}/categories/${id}`, data)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          categoryDispatch({
            type: UPDATE_CATEGORIES,
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
        <h1 className="float-start">Category</h1>
        <Button
          onClick={handleShowModal}
          className="float-end"
          variant="primary"
        >
          Add Category
        </Button>
      </div>

      <hr />

      {categoryValue.isLoaded ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>is_featured</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryValue.categories.map((cat, index) => (
              <CategoryTr
                handleShowModal={handleShowModal}
                category={cat}
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

      <CategoryModal
        show={showModal}
        handleClose={handleShowModal}
        saveCategory={saveCategory}
        updateCategory={updateCategory}
      />
    </Container>
  );
}

export default Category;
