import axios from "axios";
import { useContext, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { CLEAR_RESERVATION, LOG_OUT, SET_USER } from "../actionTypes";
import { AuthContext, ProductContext, ReservationContext } from "../contexts";
import { BACKEND_URL } from "../utils";
import logout from "../Images/logout.png";
// import MyNavbar from "./NavbarAdmin";
// import Footer from "./Footer";
function AdminLayout() {
  const { reservationDispatch } = useContext(ReservationContext);
  const { auth, authDispatch } = useContext(AuthContext);
  const { products, productsDispatch } = useContext(ProductContext);

  const navigate = useNavigate();
  const logOutHandler = () => {
    authDispatch({ type: LOG_OUT });
    reservationDispatch({ type: CLEAR_RESERVATION });
    navigate("/");
  };
  // useEffect(() => {
  //   if (!auth.user) {
  //     console.log("test admin layout :", auth);
  //     axios
  //       .get(`${BACKEND_URL}/profile`)
  //       .then((res) => {
  //         const { status, data, message } = res.data;
  //         if (status) {
  //           authDispatch({
  //             type: SET_USER,
  //             payload: data,
  //           });
  //         } else {
  //           navigate("/login");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         navigate("/login");
  //       });
  //   } else {
  //     console.log("test admin layout :", auth.user);
  //     // if (![1, 2].includes(parseInt(auth.user.role_id))) {
  //     if (![1, 2].includes(parseInt(auth.user.role_id))) {
  //       navigate("/");
  //     }
  //   }
  // }, [auth.user]);

  useEffect(() => {
    if (!auth.user) {
      const token = localStorage.getItem("AccessToken");
      if (token) {
        authDispatch({
          type: SET_USER,
          payload: token,
        });
      } else {
        navigate("/login");
      }
    }
  }, [auth, authDispatch, navigate]);

  return (
    <Container className="mx-auto">
      <div className="mainAdmin">
        {/* <MyNavbar /> */}
        <h1 id="admin">Admin Dashbord</h1>
        <section className="panier_logo">
          {auth.user && (
            <img
              style={{ width: 25, cursor: "pointer", marginLeft: 10 }}
              onClick={logOutHandler}
              title="Log Out"
              src={logout}
              alt=""
            />
          )}
        </section>
        <Navbar bg="light" expand="lg" className="py-4 my-4">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin">
                  {" "}
                  Dashboard{" "}
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="/">
                  {" "}
                  Accueil{" "}
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin/supplier">
                  Supplier
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin/product">
                  Product
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin/size">
                  Size
                </Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Link className='nav-link mx-3' to='/admin/product_availables'>
                  ProductAvailable
                </Link>
              </Nav.Item> */}
              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin/color">
                  Color
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin/category">
                  Category
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin/material">
                  Material
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="/admin/reservation">
                  Reservation
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link mx-3" to="">
                  Users
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* <MyNavbar /> */}
        <Outlet />
        {/* <Footer /> */}
      </div>
    </Container>
  );
}

export default AdminLayout;
