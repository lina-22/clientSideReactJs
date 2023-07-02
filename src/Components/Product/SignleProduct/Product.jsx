import styles from "./product.module.scss";

export const Product = ({ product, showDetails }) => {
  const { productId, name, description, price, image, discount } = product;
  return (
    <div className={styles.mainProductCart}>
      <figure>
        <img
          className={styles.product_img}
          src={`data:image/jpeg;base64, ${image} `}
          alt="prod img"
        />
      </figure>
      <h4>{name}</h4>

      <p>{description}</p>
      <section className={styles.price_and_discount}>
        <p>Prix : {price}€</p>
        <p>Sold : {discount}%</p>
      </section>
      <button
        type="button"
        className="btn btn-dark w-100"
        onClick={() => showDetails(productId)}>
        Voir details
      </button>
    </div>
  );
};
