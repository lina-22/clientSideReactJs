import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../CSS_Components/UserLayout.css";
import { useContext, useEffect } from "react";
import { AuthContext, ReservationContext } from "../contexts";
import { SET_RESERVATION, SET_USER } from "../actionTypes";

function UserLayout() {
  const { auth, authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { reservationValue, reservationDispatch } =
    useContext(ReservationContext);

  // useEffect(() => {
  //   if (auth.user) {
  //     if (!reservationValue.isLoaded) {
  //       axios.get(`${BACKEND_URL}/productsLine`).then((res) => {
  //         let { status, message, data } = res.data;
  //         if (status) {
  //           reservationDispatch({ type: SET_RESERVATION, payload: data });
  //         }
  //       });
  //     }
  //   }else{
  //       if (!auth.user) {
  //         axios
  //           .get(`${BACKEND_URL}/profile`)
  //           .then((res) => {
  //             const { status, data, message } = res.data;
  //             if (status) {
  //               authDispatch({
  //                 type: SET_USER,
  //                 payload: data,
  //               });
  //             }
  //           })
  //       }
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
      }
    }
  }, [auth, authDispatch, navigate]);

  return (
    <div className="main">
      <div id="landing">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default UserLayout;
