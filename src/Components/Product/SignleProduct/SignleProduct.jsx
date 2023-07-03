import axios from "axios";
import styles from "./singleProduct.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BACKEND_URL } from "../../../utils";
import { toast } from "react-toastify";
import { CartContext } from "../../../contexts";
import { SET_CART } from "../../../actionTypes";
import { getCartInfo } from "../../../helper/helper";

export const SignleProduct = () => {
  const { cartDispatch } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [productToSave, setProductToSave] = useState({
    size: "",
    colour: "",
  });

  useEffect(() => {
    axios.get(`${BACKEND_URL}/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);
  const handleSelect = (evt) => {
    setProductToSave({
      ...productToSave,
      [evt.target.name]: evt.target.value,
    });
  };
  const addToCart = (product) => {
    if (!productToSave.colour || !productToSave.size) {
      toast.warning("Sélectionnez le coulour et la taille");
      return;
    }
    let itemToAdd;
    let existingCart = JSON.parse(localStorage.getItem("cart"));
    if (existingCart) {
      let exists = existingCart.find((data) => data.id === product.productId);
      if (exists) {
        existingCart = existingCart.map((data) => {
          if (data.id === product.productId) {
            return { ...data, qty: (data.qty += 1) };
          } else {
            return data;
          }
        });
      } else {
        itemToAdd = {
          id: product.productId,
          image: product.image,
          name: product.name,
          price: product.price,
          size: productToSave.size,
          colour: productToSave.colour,
          qty: 1,
        };
        existingCart.push(itemToAdd);
      }
      localStorage.setItem("cart", JSON.stringify(existingCart));
    } else {
      itemToAdd = {
        id: product.productId,
        image: product.image,
        name: product.name,
        price: product.price,
        size: productToSave.size,
        colour: productToSave.colour,
        qty: 1,
      };
      let newCart = [itemToAdd];
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    toast.success("Produit est ajouté dans le panier");

    //update total and total qty -
    let updatedInfo = getCartInfo();
    cartDispatch({
      type: SET_CART,
      payload: {
        total: updatedInfo.total,
        totalQty: updatedInfo.totalQty,
      },
    });
  };

  return (
    <div className={styles.single_product_main}>
      <h4>Description de produit</h4>
      <section className={styles.description}>
        <figure>
          {product ? (
            <h6>{product?.productForSaleResDtos[0]?.material}</h6>
          ) : null}
          {product.image ? (
            <img
              className={styles.product_img}
              src={`data:image/jpeg;base64, ${product.image} `}
              alt="prod img"
            />
          ) : null}
        </figure>
        <section className={styles.details}>
          <h5>{product.name}</h5>
          <h6>{product.description}</h6>
          <p>Prix : {product.price}</p>
          <section className={styles.details_color_size}>
            <p>Choissez : </p>
            <label htmlFor="colour">Coulour :</label>
            <select
              name="colour"
              id="colour"
              onChange={handleSelect}
              value={productToSave.colour}>
              <option value="">Séletionner</option>

              {product.productForSaleResDtos?.map((data, index) => {
                if (productToSave.size) {
                  if (data.size === productToSave.size) {
                    return (
                      <option value={data.colour} key={index}>
                        {data.colour}
                      </option>
                    );
                  }
                } else {
                  return (
                    <option value={data.colour} key={index}>
                      {data.colour}
                    </option>
                  );
                }
              })}
            </select>
            <label htmlFor="color">Taille :</label>
            <select
              name="size"
              id="size"
              onChange={handleSelect}
              value={productToSave.size}>
              <option value="">Séletionner</option>
              {product.productForSaleResDtos?.map((data, index) => {
                if (productToSave.colour) {
                  if (data.colour === productToSave.colour) {
                    return (
                      <option value={data.size} key={index}>
                        {data.size} |{" "}
                        {data.qty ? "Disponible" : "Rupture de stock"}
                      </option>
                    );
                  }
                } else {
                  return (
                    <option value={data.size} key={index}>
                      {data.size}
                    </option>
                  );
                }
              })}
            </select>
          </section>
          <button
            className="btn btn-light btn-md p-1"
            type="button"
            onClick={() => addToCart(product)}>
            Ajouter au panier
          </button>
        </section>
      </section>
    </div>
  );
};
