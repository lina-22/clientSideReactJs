import axios from "axios";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { DELETE_MATERIALS, SELECT_MATERIALS } from "../../actionTypes";
import { MaterialContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function MaterialTr({ material, handleShowModal }) {
  const { materialDispatch } = useContext(MaterialContext);

  const deleteMaterial = (id) => {
    if (window.confirm("Are You Sure?")) {
      axios
        .delete(`${BACKEND_URL}/materials/${id}`)
        .then((res) => {
          const { status } = res;
          if (status) {
            materialDispatch({
              type: DELETE_MATERIALS,
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
  const editHandler = (material) => {
    materialDispatch({
      type: SELECT_MATERIALS,
      payload: material,
    });
    handleShowModal();
  };
  return (
    <tr>
      <td>{material?.materialId}</td>
      <td>{material?.materialValue}</td>
      <td>
        <Button
          type="button"
          variant="warning"
          className="mx-1"
          onClick={() => editHandler(material)}>
          Edit
        </Button>
        <Button
          type="button"
          variant="danger"
          className="mx-1"
          onClick={() => deleteMaterial(material.materialId)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default MaterialTr;
