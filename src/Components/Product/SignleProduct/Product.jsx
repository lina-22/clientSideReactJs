import styles from "./product.module.scss";

export const Product = ({ product, showDetails }) => {
  const { productId, name, description, price, image, discount } = product;
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
      <button
        type="button"
        className="btn btn-dark w-100"
        onClick={() => showDetails(productId)}>
        Voir details
      </button>
    </div>
  );
};
