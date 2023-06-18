import { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { REMOVE_SUPPLIERS } from "../../actionTypes";
import { SupplierContext } from "../../contexts";

function SupplierModal({ show, handleClose, saveSupplier, updateSupplier }) {
  const { supplierInfo, supplierDispatch } = useContext(SupplierContext);
  const [state, setState] = useState({
    supplierId: "",
    supplierValue: "",
    address: "",
    companyName: "",
    contactName: "",
    contactTitle: "",
    fax: "",
    phone: "",
    postalCode: "",
    region: "",
    supplierCountry: "",
    isLoading: false,
  });

  useEffect(() => {
    if (supplierInfo.selectedSupplier) {
      setState((prvSt) => {
        return {
          ...prvSt,
          supplierId: supplierInfo.selectedSupplier.supplierId,
          address: supplierInfo.selectedSupplier.address,
          companyName: supplierInfo.selectedSupplier.companyName,
          contactName: supplierInfo.selectedSupplier.contactName,
          contactTitle: supplierInfo.selectedSupplier.contactTitle,
          fax: supplierInfo.selectedSupplier.fax,
          phone: supplierInfo.selectedSupplier.phone,
          postalCode: supplierInfo.selectedSupplier.postalCode,
          region: supplierInfo.selectedSupplier.region,
          supplierCountry: supplierInfo.selectedSupplier.supplierCountry,
        };
      });
    }
  }, [supplierInfo, show]);

  const onChangeHandler = (e) => {
    setState((prvSt) => {
      return {
        ...prvSt,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setState((prevSt) => ({ ...prevSt, isLoading: true }));

    if (supplierInfo.selectedSupplier) {
      updateSupplier(state);
    } else {
      saveSupplier(state);
    }
  };

  const resetState = () => {
    supplierDispatch({ type: REMOVE_SUPPLIERS });

    setTimeout(() => {
      setState({
        supplierId: "",
        supplierValue: "",
        address: "",
        companyName: "",
        contactName: "",
        contactTitle: "",
        fax: "",
        phone: "",
        postalCode: "",
        region: "",
        supplierCountry: "",
        isLoading: false,
      });
    }, 5);
  };

  return (
    <Modal show={show} onHide={handleClose} onExit={resetState}>
      <Modal.Header closeButton>
        <Modal.Title>
          {supplierInfo.selectedSupplier ? "Edit Supplier" : "Add New Supplier"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Contact Title </Form.Label>
            <Form.Control
              required
              onChange={onChangeHandler}
              type="text"
              name="contactTitle"
              value={state.contactTitle}
              placeholder="Ex: Ladies"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Supplier Name</Form.Label>
            <Form.Control
              required
              onChange={onChangeHandler}
              type="text"
              name="contactName"
              value={state.contactName}
              placeholder="Ex: Jhon"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>CompanyName Name</Form.Label>
            <Form.Control
              required
              onChange={onChangeHandler}
              type="text"
              name="companyName"
              value={state.companyName}
              placeholder="Ex: TEXAS CO"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Country</Form.Label>
            <Form.Control
              required
              onChange={onChangeHandler}
              type="text"
              name="supplierCountry"
              value={state.supplierCountry}
              placeholder="Ex: France"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Address </Form.Label>
            <Form.Control
              required
              onChange={onChangeHandler}
              type="text"
              name="address"
              value={state.address}
              placeholder="Ex: 101 brown st, XB798710"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Region Name</Form.Label>
            <Form.Control
              required
              onChange={onChangeHandler}
              type="text"
              name="region"
              value={state.region}
              placeholder="Ex: Paris"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Postal Code </Form.Label>
            <Form.Control
              required
              onChange={onChangeHandler}
              type="text"
              name="postalCode"
              value={state.postalCode}
              placeholder="Ex: 75010"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Supplier phone</Form.Label>
            <Form.Control
              required
              onChange={onChangeHandler}
              type="text"
              name="phone"
              value={state.phone}
              placeholder="Ex: +01475844654"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Supplier fax</Form.Label>
            <Form.Control
              required
              onChange={onChangeHandler}
              type="text"
              name="fax"
              value={state.fax}
              placeholder="Ex: +01475844654"
              disabled={state.isLoading}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={state.isLoading}>
            {state.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SupplierModal;
