import { Link } from "react-router";
import CartSvg from "../svgs/cartSvg";

const Navbar = ({ setIsCartOpen }) => {
  return (
    <nav className="container navbar flex">
      <Link to="/" className="left-side">
        E-commerce
      </Link>
      <div className="tabs">
        <div className="icon-box" onClick={() => setIsCartOpen(true)}>
          <CartSvg />
          {/* <div className="cart-item-count">100</div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
