import axios from "axios";
import { useContext } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_RESERVATION } from "../../actionTypes";
import { ReservationContext } from "../../contexts";
import { BACKEND_URL, IMAGE_URL } from "../../utils";

function Carts() {
  const { reservationValue} =
    useContext(ReservationContext);
  return (
    <>
      <Container className="mt-5 mx-auto pt-5">
        <h1>Voir mon Panier</h1>
        <hr />
        <Row className="justify-content-center">
          <Col sm={12} lg={8} className="mt-5">
            {reservationValue.cartCount != 0 ? (
              <>
                {reservationValue.reservation.productLines.map((pl, i) => (
                  <SingleCart cart={pl} key={i} />
                ))}
              </>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
      <div className="row">
        <div className="col-4 p-2 mx-auto">
          <Button variant="secondary"className="w-100">
            {/* <Link to="/payment" ></Link> */}
            Payer Maintenant
            {/* <a href="/payment"></a> */}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Carts;

function SingleCart({ cart }) {
  const { reservationDispatch } = useContext(ReservationContext);

  const changeCartQuantity = (action) => {
    // console.log(cart);
    axios
      .post(`${BACKEND_URL}/productsLine/${action}`, {
        product_available_id: cart.product_available_id,
        reservation_id:cart.reservation_id,
        amount: 1,
      })
      .then((res) => {
        let { status, message, data } = res.data;
        if (status) {
          reservationDispatch({ type: SET_RESERVATION, payload: data });
          toast.success(message);
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong!");
      });
  };
  const deleteCart = () => {
    axios.delete(`${BACKEND_URL}/productsLine?reservation_id=${cart.reservation_id}&product_available_id=${cart.product_available_id}`
     ).then(res => {
      let {status, data, message} = res.data;

      if(status){
        toast.success("Cart Delete Success!");
        reservationDispatch({type: SET_RESERVATION, payload: data});
      }else{
        toast.success(message);
      }

    }).catch(err => {
      console.log(err);
      toast.error("Something Went Wrong!!");
    });
  }
  return (
    <div className="mb-2">
      <div className="border border-warning rounded">
        <Row>
          <Col sm={3}>
            <img
              width="100%"
              src={`${IMAGE_URL}/${cart.product.image}`}
              alt=""
            />
          </Col>
          <Col sm={5}>
            <h4>{cart.product.name}</h4>
          </Col>
          <Col sm={3}>
            <div className="p-2">
              <table className="table text-center">
                <tbody>
                  <tr>
                    <td>Colour</td>
                    <td>:</td>
                    <td>{cart.colour}</td>
                  </tr>
                  <tr>
                    <td>Size</td>
                    <td>:</td>
                    <td>{cart.size}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td>:</td>
                    <td>{cart.quantity}</td>
                  </tr>
                  <tr>
                    <td>Totol Price</td>
                    <td>:</td>
                    <td>{cart.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
              <ButtonGroup className="w-100 mt-4">
                <Button onClick={() => changeCartQuantity('decrement')} variant="info" className="w-50">
                  {" "}
                  -{" "}
                </Button>
                <Button onClick={() => changeCartQuantity('increment')} variant="primary" className="w-50">
                  {" "}
                  +{" "}
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
      </div>
      <Button variant="danger" onClick={() => deleteCart()} className="py-2 w-100 mt-1">
        Delete
      </Button>

    </div>
  );
}