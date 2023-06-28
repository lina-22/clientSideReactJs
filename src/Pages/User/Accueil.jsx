import mainImg from "../../Images/hero_img.jpg";
import photoRight from "../../Images/Final_Male_Dress/twomen.avif";
import photoLeft from "../../Images/home.webp";
import photoHome22 from "../../Images/home22.webp";
import photoHome222 from "../../Images/Final_Female_Dress/dress.jpg";
import photoHome2222 from "../../Images/Final_Female_Dress/dress22.jpg";

import photoWomen from "../../Images/Final_Female_Dress/womens.jpg";

import "../../CSS_User/Accueil.css";

function Accueil() {
  return (
    <div>
      <div className="hero">
        <img className="main_image" src={mainImg} alt="" />
        <h2 className="info_pub">
          La vie est devenue <br /> très facile
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
          {/* <article>
            {state.products.slice(0, 4).map((product, index) => (
              <Link to={`/boutiqueSubSection/${product.id}`} key={index}>
                <img
                  src={`${IMAGE_URL}/${product.image}`}
                  key={index}
                  alt="{product.name} "
                />
              </Link>
            ))}
          </article> */}
        </section>
        <section className="trending">
          <article>
            <img className="photo_right" src={photoWomen} alt="" />
            <p>à la mode maintenant</p>
            <p>pour les femmes</p>
          </article>
          <article>
            <p>à la mode maintenant</p>
            <p>pour les hommes</p>
            <img className="photo_left" src={photoRight} alt="" />
          </article>
        </section>

        <section className="promotoion">
          <article>
            {/* here need to bring the photos randomly */}
            <img className="photo_left" src={photoLeft} alt="" />
            <img className="photo_left" src={photoHome2222} alt="" />
            <img className="photo_left" src={photoHome22} alt="" />
            <img className="photo_left" src={photoHome222} alt="" />
            {/* {state.products.slice(0, 4).map((product, index) => (
              <Link to={`/boutiqueSubSection/${product.id}`} key={index}>
                <img
                  src={`${IMAGE_URL}/${product.image}`}
                  key={index}
                  alt="{product.name} "
                />
              </Link>
            ))} */}
          </article>
        </section>
      </div>
    </div>
  );
}

export default Accueil;
