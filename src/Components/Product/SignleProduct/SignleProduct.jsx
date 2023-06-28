import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BACKEND_URL } from "../../../utils";

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
      imaget: product.image,
      name: product.name,
      //   size: product.size
    };
    let newCart = [itemToAdd];
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
};
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

  return (
    <div>
      <br />
      <br />
      <h4>Details de produit</h4>
      <p>{product.name}</p>
      <button
        className="btn btn-info btn-md p-1"
        type="button"
        onClick={() => addToCart(product)}>
        Ajouter au panier
      </button>
    </div>
  );
};
