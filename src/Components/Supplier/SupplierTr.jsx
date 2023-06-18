import axios from "axios";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { DELETE_SUPPLIERS, SELECT_SUPPLIERS } from "../../actionTypes";
import { SupplierContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function SupplierTr({ supplier, handleShowModal }) {
  const { supplierDispatch } = useContext(SupplierContext);

  const deleteSupplier = (id) => {
    if (window.confirm("Are You Sure?")) {
      axios
        .delete(`${BACKEND_URL}/supplier/${id}`)
        .then((res) => {
          const { status } = res;
          if (status) {
            supplierDispatch({
              type: DELETE_SUPPLIERS,
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
  const editHandler = (supplier) => {
    supplierDispatch({
      type: SELECT_SUPPLIERS,
      payload: supplier,
    });
    handleShowModal();
  };

  return (
    <tr>
      <td>{supplier.contactTitle}</td>
      <td>{supplier.contactName}</td>
      <td>{supplier.companyName}</td>
      <td>{supplier.supplierCountry}</td>
      <td>{supplier.address}</td>
      <td>{supplier.region}</td>
      <td>{supplier.postalCode}</td>
      <td>{supplier.phone}</td>
      <td>{supplier.fax}</td>
      <td>{supplier.contactTitle}</td>
      <td>
        <Button
          type="button"
          variant="warning"
          size="sm"
          className="mx-1"
          onClick={() => editHandler(supplier)}>
          Edit
        </Button>
        <Button
          type="button"
          variant="danger"
          size="sm"
          className="mx-1"
          onClick={() => deleteSupplier(supplier.supplierId)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default SupplierTr;
