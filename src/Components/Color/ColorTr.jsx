import axios from "axios";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { DELETE_COLORS, SELECT_COLORS } from "../../actionTypes";
import { ColorContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function ColorTr({ color, handleShowModal }) {
  const { colorDispatch } = useContext(ColorContext);

  const deleteColor = (id) => {
    if (window.confirm("Are You Sure?")) {
      axios
        .delete(`${BACKEND_URL}/colours/${id}`)
        .then((res) => {
          const { status } = res;
          if (status) {
            colorDispatch({
              type: DELETE_COLORS,
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
  const editHandler = (color) => {
    colorDispatch({
      type: SELECT_COLORS,
      payload: color,
    });
    handleShowModal();
  };

  return (
    <tr>
      <td>{color.colourId}</td>
      <td>{color.colourValue}</td>
      <td>
        <Button
          type="button"
          variant="warning"
          Color="sm"
          className="mx-1"
          onClick={() => editHandler(color)}>
          Edit
        </Button>
        <Button
          type="button"
          variant="danger"
          Color="sm"
          className="mx-1"
          onClick={() => deleteColor(color.colourId)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default ColorTr;
