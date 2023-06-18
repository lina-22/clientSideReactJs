import { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { REMOVE_COLORS } from "../../actionTypes";
import { ColorContext } from "../../contexts";

function ColorModal({ show, handleClose, saveColor, updateColor }) {
  const { colorInfo, colorDispatch } = useContext(ColorContext);
  const [state, setState] = useState({
    colorId: "",
    colorValue: "",
    isLoading: false,
  });

  useEffect(() => {
    if (colorInfo.selectedColor) {
      setState((prvSt) => {
        return {
          ...prvSt,
          colourId: colorInfo.selectedColor.colourId,
          colourValue: colorInfo.selectedColor.colourValue,
        };
      });
    }
  }, [colorInfo, show]);

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

    if (colorInfo.selectedColor) {
      updateColor(state);
    } else {
      saveColor(state);
    }
  };

  const resetState = () => {
    colorDispatch({ type: REMOVE_COLORS });

    setTimeout(() => {
      setState({
        ColorId: "",
        ColorValue: "",
        isLoading: false,
      });
    }, 5);
  };

  return (
    <Modal show={show} onHide={handleClose} onExit={resetState}>
      <Modal.Header closeButton>
        <Modal.Title>
          {colorInfo.selectedColor ? "Edit Color" : "Add New Color"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="cat_name">
            <Form.Label>Color</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="text"
              name="colourValue"
              value={state.colourValue}
              placeholder="Ex: Red"
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

export default ColorModal;
