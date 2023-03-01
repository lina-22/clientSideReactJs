import "../../CSS_User/payment.css";

import paymentImg from "../../Images/paymentImage.PNG";
import { Button, Container, Table } from "react-bootstrap";

function Payment() {
  return (
    <Container className="mx-auto">
    <div className="payment">
      <section className="paymentImg">
        <img src={paymentImg} alt="" />
      </section>
    </div>
    </Container>
  );
}

export default Payment; 