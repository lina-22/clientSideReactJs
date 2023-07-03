import "../../../CSS_User/BoutiqueLandingImages.css";
import styles from "./boutique.module.scss";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../../contexts";
import axios from "axios";
import { BACKEND_URL } from "../../../utils";
import { LOAD_CATEGORIES } from "../../../actionTypes";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../Components/Product/SignleProduct/Product";
import favori from "../../../Images/favori.png";
function BoutiqueLandingImgaes() {
  const { categoryValue, categoryDispatch } = useContext(CategoryContext);
  const [catIndex, setCatIndex] = useState(0);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  let size = 10;

  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   if (!categoryValue.isLoaded) {
  //     axios
  //       .get(`${BACKEND_URL}/categories`)
  //       .then((res) => {
  //         const { status, data, message } = res.data;
  //         if (status) {
  //           categoryDispatch({
  //             type: LOAD_CATEGORIES,
  //             payload: data,
  //           });
  //         } else {
  //           toast.error(message);
  //         }
  //       })
  //       .catch();
  //   }
  // }, []);

  // useEffect(() => {
  //   getProductsPaginated();
  // }, []);
  useEffect(() => {
    console.log("test efft");
    getProductsPaginated();
  }, []);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);
  // const getProducts = () => {
  //   axios.get(`${BACKEND_URL}/products`).then((res) => {
  //     setProducts([...res.data]);
  //   });
  // };
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      getProductsPaginated();
    }
  };
  const getProductsPaginated = () => {
    axios.get(`${BACKEND_URL}/products/${page}/${size}`).then((res) => {
      console.log("res....:", res.data.content);
      setProducts((products) => [...products, ...res.data.content]);
      setPage((prevState) => prevState + 1);
    });
  };
  const showDetails = (id) => {
    console.log("test exs cart :", id);
    navigate(`/product_details/${id}`);
  };

  return (
    <div className="Bboutique">
      <div className="Blandingboutiqe">
        <h1>Boutique</h1>
        <section
          className="d-flex justify-content-around"
          style={{ background: "#f0f0f0" }}>
          <button className="p-2">Homme</button>
          <button className="p-2">Femme</button>
        </section>
        <br />
        <h2> Nos Meilleures Offres Idées susceptibles de vous plaire </h2>
      </div>
      <Container
        className={`${styles.productShowcase} mx-auto`}
        onScroll={handleScroll}>
        {products.map((product, index) => {
          return (
            <Product
              key={index}
              showDetails={showDetails}
              product={product}></Product>
          );
        })}
      </Container>
    </div>
  );
}
export default BoutiqueLandingImgaes;
