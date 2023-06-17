import styles from "./product.module.scss";
import favori from "../../../Images/favori.png";
// interface Props {
//   name: string;
//   description: String;
//   price: number;
//   image: any;
//   discount: number;
// }

export const Product = ({ name, description, price, image, discount }) => {
  let testProd = {
    id: 1,
    name: "test product",
    decription: "test decription",
    image: "../images/imgPage1/Formal1.png",
    discount: 5,
    price: 10,
  };
  return (
    <div className={styles.mainProductCart}>
      <img
        className={styles.product_img}
        src={`data:image/jpeg;base64, ${image} `}
        alt="prod img"
      />
      <h4>{name}</h4>
      <p>{description}</p>
      <p>{price}€</p>
      <p>{discount}%</p>
      <img className="favori" src={favori} alt="" />
    </div>
  );
};

// {
//   state.products.slice(0, 4).map((product, index) => (
//     <Link to={`/boutiqueSubSection/${product.id}`} key={index}>
//       <img
//         src={`${IMAGE_URL}/${product.image}`}
//         key={index}
//         alt="{product.name} "
//       />
//     </Link>
//   ));
// }
