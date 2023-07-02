import axios from "axios";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { DELETE_CATEGORIES, SELECT_CATEGORIES } from "../../actionTypes";
import { CategoryContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function CategoryTr({ category, handleShowModal }) {
  const { categoryDispatch } = useContext(CategoryContext);

  const deleteCategory = (id) => {
    if (window.confirm("Are You Sure?")) {
      axios
        .delete(`${BACKEND_URL}/categories/${id}`)
        .then((res) => {
          const { status } = res;
          if (status === 200) {
            categoryDispatch({
              type: DELETE_CATEGORIES,
              payload: id,
            });

            toast.success("Successfully deleted");
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Server Error!!");
        });
    }
  };
  const editHandler = (cat) => {
    categoryDispatch({
      type: SELECT_CATEGORIES,
      payload: cat,
    });
    handleShowModal();
  };

  return (
    <tr>
      <td>{category.categoryId}</td>
      <td>{category.categoryValue}</td>
      <td>
        <Button
          type="button"
          variant="warning"
          size="sm"
          className="mx-1"
          onClick={() => editHandler(category)}>
          Edit
        </Button>
        <Button
          type="button"
          variant="danger"
          size="sm"
          className="mx-1"
          onClick={() => deleteCategory(category.categoryId)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default CategoryTr;
