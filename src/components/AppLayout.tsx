import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Cart from "./Cart";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const getCartData = async () => {
    const res = await fetch("https://fakestoreapi.com/carts/user/2");
    const data = await res.json();
    const allProducts = data[0].products.map((item) => {
      return fetch(`https://fakestoreapi.com/products/${item.productId}`).then(
        (res) => res.json()
      );
    });

    const all = await Promise.all(allProducts);
    setCartItems(all);
  };
  useEffect(() => {
    getCartData();
  }, []);

  const removeItemFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar setIsCartOpen={setIsCartOpen} />

      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={removeItemFromCart}
        />
      )}

      <Outlet />
    </>
  );
};

export default AppLayout;
