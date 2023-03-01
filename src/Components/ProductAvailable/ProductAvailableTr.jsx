import axios from "axios";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { DELETE_PRODUCTSAVAILABLE, SELECT_PRODUCTSAVAILABLE} from "../../actionTypes";
import { ProductAvailableContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function ProductAvailableTr({ productAvailable, handleShowModal }) {
  const { productAvailableValue, productAvailableDispatch } = useContext(ProductAvailableContext);

  const deleteProductAvailable = (id) => {
    if(window.confirm('Are You Sure?')){


      axios.delete(`${BACKEND_URL}/productsAvailable/${id}`).then(res => {
        const {status, message} = res.data;

        if(status){

          productAvailableDispatch({
            type: DELETE_PRODUCTSAVAILABLE,
            payload: id
          })
          
          toast.success(message);
        }else{
          toast.error(message);
        }

      }).catch(err => {
        console.log(err);
        toast.error('Server Error!!')
      })

    }

  }

  const editHandler = prodAvailable => {
    productAvailableDispatch({
      type: SELECT_PRODUCTSAVAILABLE,
      payload: prodAvailable
    })
    handleShowModal();

  }

  return (
    <tr>

      <td>{productAvailable.id}</td>
      <td>{productAvailable.product_id}</td>
      <td>{productAvailable.colour}</td> 
      <td>{productAvailable.quantity}pcs</td> 
      <td>{productAvailable.size}</td> 

      <td>
        <Button variant="warning" size="sm" className="mx-1" onClick={() => editHandler(productAvailable)}>Edit</Button>
        <Button variant="danger" size="sm" className="mx-1" onClick={() => deleteProductAvailable(productAvailable.id)}>Delete</Button>
      </td>
    </tr>
  );
}

export default ProductAvailableTr;
