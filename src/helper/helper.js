export const getCartInfo = () => {
  let totalQty = 0,
    total = 0;
  let cart = JSON.parse(localStorage.getItem("cart"));

  cart?.forEach((data) => {
    totalQty = totalQty + data.qty;
    total = total + data.qty * data.price;
  });
  return {
    totalQty,
    total,
  };
};
