import axios from "axios";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { DELETE_SIZES, SELECT_SIZES } from "../../actionTypes";
import { SizeContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function SizeTr({ size, handleShowModal }) {
  const { sizeDispatch } = useContext(SizeContext);

  const deleteSize = (id) => {
    if (window.confirm("Are You Sure?")) {
      axios
        .delete(`${BACKEND_URL}/sizes/${id}`)
        .then((res) => {
          const { status } = res;
          if (status) {
            sizeDispatch({
              type: DELETE_SIZES,
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
    sizeDispatch({
      type: SELECT_SIZES,
      payload: cat,
    });
    handleShowModal();
  };

  return (
    <tr>
      <td>{size?.sizeId}</td>
      <td>{size?.sizeValue}</td>
      <td>
        <Button
          type="button"
          variant="warning"
          size="sm"
          className="mx-1"
          onClick={() => editHandler(size)}>
          Edit
        </Button>
        <Button
          type="button"
          variant="danger"
          size="sm"
          className="mx-1"
          onClick={() => deleteSize(size.sizeId)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default SizeTr;
