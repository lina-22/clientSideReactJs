import mainImg from "../../Images/imgPage1/image 23.png";
import photoLeft from "../../Images/imgPage1/vedio.png";
import photoRight from "../../Images/imgPage1/vedio.png";

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL, IMAGE_URL } from "../../utils";

import "../../CSS_User/Accueil.css";
import { Link } from "react-router-dom";

function Accueil() {
  const [state, setState] = useState({
    products: [],
    categories: [],
  });
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/gethomedata`)
      .then((res) => {
        const responseData = res.data;

        if (responseData.status === true) {
          setState(responseData.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="hero">
        <img className="main_image" src={mainImg} alt="" />
        <h2 className="info_pub">
          Économisez votre temps <br /> et vivez facilement
        </h2>
        <h3>Meilleures ventes de vêtements!</h3>
      </div>
      <div className="promo_trending">
        <section className="promotoion">
          <h4>
            Toutes les tendances <br />
            <span>A UN SEUL ENDROIT</span>
            {/* <span>Les Styles Du Moment</span> */}
          </h4>
          <article>
            {state.products.slice(0, 4).map((product, index) => (
              <Link to={`/boutiqueSubSection/${product.id}`} key={index}>
                <img
                  src={`${IMAGE_URL}/${product.image}`}
                  key={index}
                  alt="{product.name} "
                />
              </Link>
            ))}
          </article>
        </section>
        <section className="trending">
          <article>
            <img className="photo_right" src={photoRight} alt="" />
            <p>à la mode maintenant</p>
            <p>pour les femmes</p>
          </article>
          <article>
            <p>à la mode maintenant</p>
            <p>pour les hommes</p>
            <img className="photo_left" src={photoLeft} alt="" />
          </article>
        </section>

        <section className="promotoion">
          <article>
            {/* here need to bring the photos randomly */}
            <img className="photo_left" src={photoLeft} alt="" />
            <img className="photo_left" src={photoLeft} alt="" />
            <img className="photo_left" src={photoLeft} alt="" />
            <img className="photo_left" src={photoLeft} alt="" />
            {state.products.slice(0, 4).map((product, index) => (
              <Link to={`/boutiqueSubSection/${product.id}`} key={index}>
                <img
                  src={`${IMAGE_URL}/${product.image}`}
                  key={index}
                  alt="{product.name} "
                />
              </Link>
            ))}
          </article>
        </section>
      </div>
    </div>
  );
}

export default Accueil;
