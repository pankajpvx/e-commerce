import CartSvg from "../svgs/cartSvg";

const Navbar = () => {
  return (
    <nav className="container navbar flex">
      <div className="left-side">E-commerce</div>
      <div className="tabs">
        <div className="icon-box">
          <CartSvg />
          {/* <div className="cart-item-count">100</div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
