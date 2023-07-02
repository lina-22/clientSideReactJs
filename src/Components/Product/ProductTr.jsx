import axios from "axios";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { DELETE_PRODUCTS, SELECT_PRODUCTS } from "../../actionTypes";
import { ProductContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";

function ProductTr({ product, handleShowModal, handleAttatchModal }) {
  const { productDispatch } = useContext(ProductContext);

  const deleteProduct = (id) => {
    if (window.confirm("Are You Sure?")) {
      axios
        .delete(`${BACKEND_URL}/products/${id}`)
        .then((res) => {
          const { status, data } = res;

          if (status) {
            productDispatch({
              type: DELETE_PRODUCTS,
              payload: id,
            });

            toast.success(data);
          } else {
            toast.error(data);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Server Error!!");
        });
    }
  };

  const editHandler = (prod) => {
    productDispatch({
      type: SELECT_PRODUCTS,
      payload: prod,
    });
    handleShowModal();
  };

  const attactchCategoryHandler = (prod) => {
    productDispatch({
      type: SELECT_PRODUCTS,
      payload: prod,
    });

    handleAttatchModal();
  };

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}&euro;</td>
      <td>{product.discount}%</td>
      <td>
        {product.image ? (
          <img
            width={50}
            height={70}
            src={`data:image/jpeg;base64, ${product.image} `}
            alt="product img"
          />
        ) : (
          ""
        )}
      </td>
      <td>{product.description}</td>
      <td>
        <Button
          variant="warning"
          size="sm"
          className="mx-1"
          onClick={() => editHandler(product)}>
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="mx-1"
          onClick={() => deleteProduct(product.productId)}>
          Delete
        </Button>

        {/* <Button
          variant="success"
          size="sm"
          className="mx-1"
          onClick={() => attactchCategoryHandler(product)}>
          Attatch Category
        </Button> */}
      </td>
    </tr>
  );
}

export default ProductTr;
