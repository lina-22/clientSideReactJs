import { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { REMOVE_SIZES } from "../../actionTypes";
import { SizeContext } from "../../contexts";

function SizeModal({ show, handleClose, saveSize, updateSize }) {
  const { sizeInfo, sizeDispatch } = useContext(SizeContext);
  const [state, setState] = useState({
    sizeId: "",
    sizeValue: "",
    isLoading: false,
  });

  useEffect(() => {
    if (sizeInfo.selectedSize) {
      setState((prvSt) => {
        return {
          ...prvSt,
          sizeId: sizeInfo.selectedSize.sizeId,
          sizeValue: sizeInfo.selectedSize.sizeValue,
        };
      });
    }
  }, [sizeInfo, show]);

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

    if (sizeInfo.selectedsize) {
      updateSize(state);
    } else {
      saveSize(state);
    }
  };

  const resetState = () => {
    sizeDispatch({ type: REMOVE_SIZES });

    setTimeout(() => {
      setState({
        sizeId: "",
        sizeValue: "",
        isLoading: false,
      });
    }, 5);
  };

  return (
    <Modal show={show} onHide={handleClose} onExit={resetState}>
      <Modal.Header closeButton>
        <Modal.Title>
          {sizeInfo.selectedSize ? "Edit size" : "Add New Size"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Size</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="text"
              name="sizeValue"
              value={state.sizeValue}
              placeholder="Ex: M"
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

export default SizeModal;
