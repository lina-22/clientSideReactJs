import { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { REMOVE_MATERIALS } from "../../actionTypes";
import { MaterialContext } from "../../contexts";

function MaterialModal({ show, handleClose, saveMaterial, updateMaterial }) {
  const { materialInfo, materialDispatch } = useContext(MaterialContext);
  const [state, setState] = useState({
    materialId: "",
    materialValue: "",
    isLoading: false,
  });

  // useEffect(() => {
  //   if (materialInfo.selectedMaterial) {
  //     setState((prvSt) => {
  //       return {
  //         ...prvSt,
  //         materialId: materialInfo.selectedMaterial.materialId,
  //         materialValue: materialInfo.selectedmaterial.materialValue,
  //       };
  //     });
  //   }
  // }, [materialInfo, show]);

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

    if (materialInfo.selectedMaterial) {
      updateMaterial(state);
    } else {
      saveMaterial(state);
    }
  };

  const resetState = () => {
    materialDispatch({ type: REMOVE_MATERIALS });

    setTimeout(() => {
      setState({
        materialId: "",
        materialValue: "",
        isLoading: false,
      });
    }, 5);
  };

  return (
    <Modal show={show} onHide={handleClose} onExit={resetState}>
      <Modal.Header closeButton>
        <Modal.Title>
          {materialInfo.selectedMaterial ? "Edit material" : "Add New material"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="mat_name">
            <Form.Label>Material</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type="text"
              name="materialValue"
              value={state.materialValue}
              placeholder="Ex: Cotton"
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

export default MaterialModal;
