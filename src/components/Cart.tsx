import { X, Trash2 } from "lucide-react";
import "../style/cart.css";
import { Product } from "../ApiData";

interface CartProps {
  items: Product[];
  onClose: () => void;
  onRemoveItem: (id: number) => void;
}

export default function Cart({ items, onClose, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="overlay">
      <div className="cart">
        <div className="header">
          <h2 className="title">Your Cart</h2>
          <button onClick={onClose} className="closeButton">
            <X size={24} />
          </button>
        </div>
        {items.length === 0 ? (
          <p className="emptyCart">Your cart is empty</p>
        ) : (
          <>
            <div className="itemList">
              {items.map((item) => (
                <div key={item.id} className="item">
                  <img
                    src={item.image}
                    alt={"image"}
                    width={50}
                    height={50}
                    className="itemImage"
                  />
                  <div className="itemDetails">
                    <h3 className="itemName">{item.title}</h3>
                    <p className="itemPrice">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="removeButton"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkoutButton">Proceed to Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}
