import { Link } from "react-router-dom";
import logoImg from "../Images/IF.JPG";
import panierImg from "../Images/imgPage1/panier_img.png";
import shoppingCartIcon from "../Images/imgPage1/shopping_cart.svg";
import menuIcon from "../Images/menu.png";
import logout from "../Images/logout.png";
import favori from "../Images/favori.png";

import "../CSS_Components/Navbar.css";
import { useContext } from "react";
import { AuthContext, ReservationContext } from "../contexts";
import { CLEAR_RESERVATION, LOG_OUT } from "../actionTypes";
function Navbar() {
  const { auth, authDispatch } = useContext(AuthContext);
  const { reservationValue, reservationDispatch } =
    useContext(ReservationContext);
  const logOutHandler = () => {
    authDispatch({ type: LOG_OUT });
    reservationDispatch({ type: CLEAR_RESERVATION });
  };

  return (
    <section className="top">
      <marquee className="top_p">
        Choisissez et récupérez votre produit de n'importe où
      </marquee>
      <section className="logo_ttl_bskt">
        <img className="logo" src={logoImg} alt="" />
        <header>
          <h1>
            Infinity <span></span> Fashion
          </h1>
        </header>
        <section className="panier_logo">
          <Link to={"/carts"}>
            <span className="position-relative mx-4">
              <img className="panier" src={shoppingCartIcon} alt="panier" />
              <span
                style={{
                  backgroundColor: "#0c6d74",
                  right: -20,
                  borderRadius: "50%",
                }}
                className="position-absolute px-3 py-1 text-white"
              >
                {reservationValue.cartCount}
              </span>
            </span>
          </Link>

          {auth.user && (
            <>
              <img
                style={{ width: 25, cursor: "pointer", marginLeft: 10 }}
                onClick={logOutHandler}
                title="Log Out"
                src={logout}
                alt=""
              />
              <span>{auth.user.first_name}</span>
            </>
          )}
        </section>
      </section>

      {/* panier and loginOut section end */}
      <section className="mainNav">
        <input type="checkbox" id="nav-toggler" className="nav-toggler" />
        <label htmlFor="nav-toggler" id="nav-lbl">
          <img
            style={{ width: 25, cursor: "pointer", marginLeft: 10 }}
            src={menuIcon}
            alt="menu"
          />
        </label>
        <nav>
          <ul>
            <li>
              <Link to="/"> Accueil </Link>
            </li>
            <li>
              <Link to="/boutiqueLandingImgaes"> Boutique </Link>
            </li>
            <li>
              {auth.user ? (
                <Link to="#" onClick={logOutHandler}>
                  Disconnexion{" "}
                </Link>
              ) : (
                <Link to="/login"> Connexion </Link>
              )}
            </li>
            <li>
              <Link to="/panier"> Contact </Link>
            </li>
            <li>
              <Link to="/propos"> Propos </Link>
            </li>
            <li>
              <Link to="/">
                {" "}
                Favori <img className="favori" src={favori} alt="" />
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </section>
  );
}
export default Navbar;
