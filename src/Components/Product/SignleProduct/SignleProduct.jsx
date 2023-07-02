import axios from "axios";
import styles from "./singleProduct.module.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BACKEND_URL } from "../../../utils";

export const SignleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  useEffect(() => {
    axios.get(`${BACKEND_URL}/products/${id}`).then((res) => {
      console.log("====================================");
      console.log("test data : ", res);
      console.log("====================================");
      setProduct(res.data);
    });
  }, []);

  const addToCart = (product) => {
    let existingCart = JSON.parse(localStorage.getItem("cart"));
    console.log("====================================");
    console.log("test exs cart :", existingCart);
    console.log("====================================");
    if (existingCart) {
      console.log("====================================");
      console.log("cart exists : ", existingCart);
      console.log("====================================");
    } else {
      let itemToAdd = {
        id: product.productId,
        qty: 1,
        image: product.image,
        name: product.name,
        //   size: product.size
      };
      let newCart = [itemToAdd];
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  return (
    <div className={styles.single_product_main}>
      <h4>Description de produit</h4>
      <section className={styles.description}>
        <figure>
          <img
            className={styles.product_img}
            src={`data:image/jpeg;base64, ${product.image} `}
            alt="prod img"
          />
        </figure>
        <section className={styles.details}>
          <h5>{product.name}</h5>
          <h6>{product.description}</h6>
          {product.productForSaleResDtos.map((data) => {
            return (
              <section>
                <p>Coulour : {data.colour}</p>
                <p>Taille : {data.size}</p>
                <p>Taille : {data.material}</p>
                <p>Disponible : {data.qty}</p>
              </section>
            );
          })}
          <button
            className="btn btn-info btn-md p-1"
            type="button"
            onClick={() => addToCart(product)}>
            Ajouter au panier
          </button>
        </section>
      </section>
    </div>
  );
};
