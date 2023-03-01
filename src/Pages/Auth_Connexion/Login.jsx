import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container, Form, FormControl, FormLabel } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_IN } from "../../actionTypes";
import { AuthContext } from "../../contexts";
import { BACKEND_URL } from "../../utils";
// import style from "./Login.css";

function Login() {
  const { auth, authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
  });

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  });

  const location = useLocation();

  useEffect(() => {
    if (auth.user) {
      if (location.state) {
        navigate(location.state.prevLocation);
      } else {
        navigate("/");
      }
    }
  }, [auth.user]);

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });

    axios
      .post(`${BACKEND_URL}/login`, {
        email: state.email,
        password: state.password,
      })
      .then((res) => {
        const { status, data, message } = res.data;
        if (status) {
          authDispatch({
            type: LOG_IN,
            payload: data,
          });
          toast.success(message);
          setState({ email: "", password: "", isLoading: false });
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
      style={{ height: "100vh"}}
      className="mx-auto d-flex justify-content-center align-items-center btn-light"
    >
      <div className="p-4 border shadow rounded w-50">
        <Form onSubmit={onSubmitHandler}>
          <h2 className="text-center mb-3">Log In</h2>
          <hr />
          <Form.Group className="my-3">
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              className="mt-2 py-2 px-3"
              id="email"
              onChange={onChangeHandler}
              placeholder="Enter Your Email"
              value={state.email}
              disabled={state.isLoading}
            />
          </Form.Group>

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
          <div className="my-3">
            <span>
              Not Yet Registered? Please{" "}
              <Link to="/registration">Register</Link>
            </span>
          </div>

          <div className="Logininput-group">
            <input
              type="submit"
              className="btn w-100 btn-secondary py-2"
              value={state.isLoading ? "Loading..." : "LOGIN"}
              disabled={state.isLoading}
            />
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
