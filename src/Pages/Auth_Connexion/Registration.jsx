import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_IN } from "../../actionTypes";
import { AuthContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";


function Registration() {
  const { auth, authDispatch } = useContext(AuthContext);
  const [state, setState] = useState({
    isLoading: false,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  });

  const onChangeHandler = (e) => {
    setState((prevSt) => {
      return {
        ...prevSt,
        [e.target.id]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });

    axios
      .post(`${BACKEND_URL}/register`, state)
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          authDispatch({
            type: LOG_IN,
            payload: data,
          });

          toast.success(message);

          setState({
            isLoading: false,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
          });

          navigate("/");
        } else {
          toast.error(message);
          setState({ ...state, isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong!!");
        setState({ ...state, isLoading: false });
      });
  };

  return (
    <Container
      style={{ height: "100vh" }}
      className="mx-auto d-flex justify-content-center align-items-center btn-dark"
    >
      <div className="p-4 border shadow rounded w-50">
        <Form onSubmit={onSubmitHandler}>
          <h2 className="text-center mb-3">Créer Un Compte</h2>
          <hr />

          {/* ***************First Name************* */}
          <Form.Group className="my-3">
            <FormLabel>First Name</FormLabel>
            <FormControl
              type="text"
              className="mt-2 py-2 px-3"
              id="first_name"
              onChange={onChangeHandler}
              placeholder="First Name"
              value={state.first_name}
              disabled={state.isLoading}
            />
          </Form.Group>
          {/* ***************Last Name*************** */}
          <Form.Group className="my-3">
            <FormLabel>Last Name</FormLabel>
            <FormControl
              type="text"
              className="mt-2 py-2 px-3"
              id="last_name"
              onChange={onChangeHandler}
              placeholder="Last Name"
              value={state.last_name}
              disabled={state.isLoading}
            />
          </Form.Group>
          {/* ***************Email*************** */}
          <Form.Group className="my-3">
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              className="mt-2 py-2 px-3"
              id="email"
              onChange={onChangeHandler}
              placeholder="name@example.com"
              value={state.email}
              disabled={state.isLoading}
            />
          </Form.Group>
          {/* ***************Password*************** */}
          <Form.Group className="my-3">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              className="mt-2 py-2 px-3"
              id="password"
              onChange={onChangeHandler}
              placeholder="Enter Your Password"
              value={state.password}
              disabled={state.isLoading}
            />
          </Form.Group>

          {/* ***************confirm_Password*************** */}
          <Form.Group className="my-3">
            <FormLabel>Password Confirmation</FormLabel>
            <FormControl
              type="password"
              className="mt-2 py-2 px-3"
              id="password_confirmation"
              onChange={onChangeHandler}
              placeholder="Enter Your Password"
              value={state.password_confirmation}
              disabled={state.isLoading}
            />
          </Form.Group>

          {/* **********Button********** */}
          <div className="my-3">
            <span>
              Already Registered? Please <Link to="/login">Login</Link>
            </span>
          </div>

          <div className="Registration-group">
            <input
              type="submit"
              className="btn w-100 btn-info py-2"
              value={state.isLoading ? "Loading..." : "REGISTRATION"}
              disabled={state.isLoading}
            />
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Registration;
