import { Routes, Route } from "react-router-dom";
// *************************************************
// **************All Pages For Admin****************
// *************************************************
import AdminLayout from "./Components/AdminLayout";
import AdminDashBord from "./Pages/Admin/AdminDashBord";
import Category from "./Pages/Admin/Category";
import Size from "./Pages/Admin/Size";
import Color from "./Pages/Admin/Color";
import Material from "./Pages/Admin/Material";
import Supplier from "./Pages/Admin/Supplier";
import Product from "./Pages/Admin/Product";
import ProductAvailable from "./Pages/Admin/ProductAvailable";
import Reservation from "./Pages/Admin/Reservation";
// *************************************************
// **************All Pages For User****************
// *************************************************
import UserLayout from "./Components/UserLayout";
import Accueil from "./Pages/User/Accueil";
import BoutiqueLandingImgaes from "./Pages/User/Boutiqe/BoutiqueLandingImgaes";
import BoutiqueSubSection from "./Pages/User/BoutiqueSubSection";
import Cart from "./Pages/User/Cart";
import Panier from "./Pages/User/Group";
import Payment from "./Pages/User/payment";
import Propos from "./Pages/User/Propos";

// *************************************************
// **************All Pages For Auth****************
// *************************************************
import Login from "./Pages/Auth_Connexion/Login";
import Registration from "./Pages/Auth_Connexion/Registration";

// *************************************************
// **************All Imports For Context****************
// *************************************************
import {
  AuthContext,
  CategoryContext,
  ColorContext,
  MaterialContext,
  SizeContext,
  SupplierContext,
  ProductContext,
  ProductAvailableContext,
  CartContext,
  ReservationContext,
  AdminReservationContext,
} from "./contexts";

// *************************************************
// **************All Imports For Reducer****************
// *************************************************
import { useReducer } from "react";
import {
  adminReservationReducer,
  adminReservationStore,
} from "./reducers/adminReservationReducer";
import { authReducer, userStore } from "./reducers/authReducer";
import { categoryReducer, categoryStore } from "./reducers/categoryReducer";
import { colorReducer, colorStore } from "./reducers/colorReducer";
import { materialReducer, materialStore } from "./reducers/materialReducer";
import { sizeReducer, sizeStore } from "./reducers/sizeReducer";
import { supplierReducer, supplierStore } from "./reducers/supplierReducer";
import { productReducer, productStore } from "./reducers/productReducer";
import { cartReducer, cartStore } from "./reducers/cartReducer";
import {
  reservationReducer,
  reservationStore,
} from "./reducers/reservationReducer";
import {
  productAvailableReducer,
  productAvailableStore,
} from "./reducers/productAvailableReducer";
// *************************************************
// **************All Imports For React-Bootsrap/CSS****************
// *************************************************
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// *************************************************
// **************All Imports For Token/axios****************
// *************************************************
import axios from "axios";
import UserReservation from "./Pages/User/UserReservation";
import { SignleProduct } from "./Components/Product/SignleProduct/SignleProduct";

// *************************************************
// **************Function App started***************
// *************************************************

function App() {
  const [adminReservationValue, adminReservationDispatch] = useReducer(
    adminReservationReducer,
    adminReservationStore
  );

  // const [auth, authDispatch] = useReducer(authReducer, {});
  const [auth, authDispatch] = useReducer(authReducer, userStore);

  const [categoryInfo, categoryDispatch] = useReducer(
    categoryReducer,
    categoryStore
  );
  const [colorInfo, colorDispatch] = useReducer(colorReducer, colorStore);
  const [materialInfo, materialDispatch] = useReducer(
    materialReducer,
    materialStore
  );
  const [sizeInfo, sizeDispatch] = useReducer(sizeReducer, sizeStore);
  const [supplierInfo, supplierDispatch] = useReducer(
    supplierReducer,
    supplierStore
  );

  const [productAvailableValue, productAvailableDispatch] = useReducer(
    productAvailableReducer,
    productAvailableStore
  );

  const [productValue, productDispatch] = useReducer(
    productReducer,
    productStore
  );

  const [cartInfo, cartDispatch] = useReducer(cartReducer, cartStore);

  const [reservationValue, reservationDispatch] = useReducer(
    reservationReducer,
    reservationStore
  );

  const token = localStorage.getItem("AccessToken");
  // console.log(token);

  if (token) {
    axios.defaults.headers.common = { Authorization: token };
  }
  return (
    <>
      <AuthContext.Provider value={{ auth, authDispatch }}>
        <CartContext.Provider value={{ cartInfo, cartDispatch }}>
          <CategoryContext.Provider value={{ categoryInfo, categoryDispatch }}>
            <ColorContext.Provider value={{ colorInfo, colorDispatch }}>
              <MaterialContext.Provider
                value={{ materialInfo, materialDispatch }}>
                <SizeContext.Provider value={{ sizeInfo, sizeDispatch }}>
                  <SupplierContext.Provider
                    value={{ supplierInfo, supplierDispatch }}>
                    <ProductContext.Provider
                      value={{ productValue, productDispatch }}>
                      <ProductAvailableContext.Provider
                        value={{
                          productAvailableValue,
                          productAvailableDispatch,
                        }}>
                        <ReservationContext.Provider
                          value={{ reservationValue, reservationDispatch }}>
                          <AdminReservationContext.Provider
                            value={{
                              adminReservationValue,
                              adminReservationDispatch,
                            }}>
                            <Routes>
                              <Route path="/login" element={<Login />} />
                              <Route
                                path="/registration"
                                element={<Registration />}
                              />
                              <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<AdminDashBord />} />
                                <Route path="category" element={<Category />} />
                                <Route path="size" element={<Size />} />
                                <Route path="color" element={<Color />} />
                                <Route path="material" element={<Material />} />
                                <Route path="supplier" element={<Supplier />} />
                                <Route path="product" element={<Product />} />
                                <Route
                                  path="reservation"
                                  element={<Reservation />}
                                />
                                <Route
                                  path="product_availables"
                                  element={<ProductAvailable />}
                                />
                              </Route>

                              <Route path="/" element={<UserLayout />}>
                                <Route index element={<Accueil />} />
                                <Route
                                  path="boutiqueSubSection/:productID"
                                  element={<BoutiqueSubSection />}
                                />

                                <Route
                                  path="boutiqueLandingImgaes"
                                  element={<BoutiqueLandingImgaes />}
                                />

                                <Route
                                  path="product_details/:id"
                                  element={<SignleProduct />}
                                />
                                <Route path="panier" element={<Panier />} />
                                <Route path="propos" element={<Propos />} />
                                <Route
                                  path="user-reservation"
                                  element={<UserReservation />}
                                />
                                <Route path="cart" element={<Cart />} />
                                <Route path="payment" element={<Payment />} />
                                <Route path="category" element={<Category />} />
                              </Route>
                            </Routes>
                          </AdminReservationContext.Provider>
                        </ReservationContext.Provider>
                      </ProductAvailableContext.Provider>
                    </ProductContext.Provider>
                  </SupplierContext.Provider>
                </SizeContext.Provider>
              </MaterialContext.Provider>
            </ColorContext.Provider>
          </CategoryContext.Provider>
        </CartContext.Provider>
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
