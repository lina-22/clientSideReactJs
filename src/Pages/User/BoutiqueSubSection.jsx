import "../../CSS_User/BoutiqueSubSection.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL, IMAGE_URL } from "../../utils";
import { toast } from "react-toastify";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { AuthContext, ReservationContext } from "../../contexts";
import { SET_RESERVATION } from "../../actionTypes";

function BoutiqueSubSection() {
  const { productID } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (productID) {
      getProduct();
    }
  }, [productID]);

  const getProduct = () => {
    axios
      .get(`${BACKEND_URL}/products/${productID}`)
      .then((res) => {
        let { status, message, data } = res.data;
        if (status) {
          setProduct(data);
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong!");
      });
  };

  return (
    <>
      <Container className="mx-auto">
        <div id="boutiqeSubsection">
          <h1>Boutique</h1>
          <br /> <br />
          <h4> Choisissez Votre produit </h4>
        </div>

        <Row className="my-5">
          <Col md={8} lg={9}>
            <Row>
              <Col sm={6}>
                <div className="px-2">
                  <img
                    className="w-100"
                    src={`${IMAGE_URL}/${product.image}`}
                    alt={product.name}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className="px-2">
                  <h4 className="bg-light border-start border-warning border-5 py-3 px-2">
                    {product.name}
                  </h4>
                </div>
                <div className="px-2">
                  <h4 className="bg-light border-start border-warning border-5 py-3 px-2">
                   Le Prix : {product.price}
                  </h4>
                </div>
                <div className="px-2">
                  <h4 className="bg-light border-start border-warning border-5 py-3 px-2">
                  La réduction: {product.discount}
                  </h4>
                </div>
                <div className="px-2">
                  <h4 className="bg-light border-start border-warning border-5 py-3 px-2">
                  La description {product.description}
                  </h4>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={4} lg={3}>
            {product.availables &&
              product.availables.map((avail, index) => (
                <AvailableBox avl={avail} key={index} productID={productID} getProduct={getProduct} />
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default BoutiqueSubSection;

function AvailableBox({ avl, productID, getProduct }) {
  const [cartQuantity, setCartQuantity] = useState();
  const { reservationDispatch } = useContext(ReservationContext);
  const { auth } = useContext(AuthContext);
  const navigator = useNavigate();
  const location = useLocation();

  const onChangeHandler = (e) => {
    if (e.target.value > avl.quantity) {
      toast.warning("Amount Is Larger then Quantity!");
    } else {
      setCartQuantity(e.target.value);
    }
  };

  const addToCart = () => {
    if (auth.user) {
      axios
        .post(`${BACKEND_URL}/productsLine`, {
          product_available_id: avl.id,
          quantity: cartQuantity,
          product_id: productID,
        })
        .then((res) => {
          let { message, data, status } = res.data;

          if (status) {
            toast.success("Ajouter au panier!");
            setCartQuantity("");
              getProduct();
            reservationDispatch({ type: SET_RESERVATION, payload: data });
          } else {
            toast.success(message);
          }
        })
        .catch((err) => {});
    } else {
      toast.warning("You Must be Logged In!");
      navigator("/login", { state: { prevLocation: location.pathname } });
    }
  };
// console.log(productID,cartQuantity,avl.id);
  return (
    <div className="mt-3 p-2 border">
      <ListGroup>
        <ListGroup.Item>Colour: {avl.colour}</ListGroup.Item>
        <ListGroup.Item>Size: {avl.size}</ListGroup.Item>
        <ListGroup.Item>Quantity: {avl.quantity}</ListGroup.Item>
      </ListGroup>
      <div className="row">
        <div className="col-4 p-2">
          <input
            type="number"
            onChange={onChangeHandler}
            value={cartQuantity}
            className="form-control"
            min={0}
          />
        </div>
        <div className="col-8 p-2">
          <Button variant="primary" onClick={addToCart} className="w-100">
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
}
