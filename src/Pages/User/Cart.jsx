import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";

function Cart() {
  const [productList, setProductList] = useState("");
  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setProductList(cart);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    console.log("test panier list  :", productList);
  }, [productList]);
  return (
    <>
      <Container className="mt-5 mx-auto pt-5">
        <h1>Voir mon Panier</h1>
        <hr />
        {productList ? (
          <Row className="justify-content-center">
            {/* <Col sm={12} lg={8} className="mt-5"> */}
            {/* {reservationValue.cartCount != 0 ? (
              <>
                {reservationValue.reservation.productLines.map((pl, i) => (
                  <SingleCart cart={pl} key={i} />
                ))}
              </>
            ) : (
              ""
            )} */}
            <table sm={12} lg={8} className="mt-5">
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="p-1">Photo</th>
                  <th className="p-2">Prix</th>
                  <th className="p-2">Quantité</th>
                  <th className="p-2">Taille</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td className="p-1">
                        {data.image ? (
                          <img
                            width={"70px"}
                            height={"100px"}
                            src={`data:image/jpeg;base64, ${data.image} `}
                            alt="prod img"
                          />
                        ) : null}
                      </td>
                      <td className="p-2"> {data.price} €</td>
                      <td className="p-2"> {data.qty} </td>
                      <td className="p-2"> {data.size} </td>
                      <td className="p-2">
                        <button
                          type="button"
                          className="btn btn-primary p-1 m-1">
                          +
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger p-1 m-1">
                          -
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* </Col> */}
          </Row>
        ) : (
          <h2>Panier est vide!</h2>
        )}
      </Container>
      <div className="row">
        <div className="col-4 p-2 mx-auto">
          {productList.length ? (
            <Button variant="secondary" className="w-100">
              Réserver Maintenant
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Cart;
