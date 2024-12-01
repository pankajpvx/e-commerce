import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ApiManager } from "../Api/ApiManager";
import { Product } from "../ApiData";
import "../style/productDetails.css";
import { StarRating } from "../components/Rating";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loader, setIsloader] = useState(false);

  console.log(product);

  const getProductDetails = async () => {
    try {
      setIsloader(true);
      const res = await ApiManager.getProduct(id);
      setProduct(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloader(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const AddToCart = () => {};

  if (!loader && product)
    return (
      <section className="container product-details">
        <h1>{product?.title}</h1>
        <div className="flex detail-wrap">
          <div className="image-box">
            <img src={product?.image} alt="image" />
          </div>
          <div className="details">
            <h2 className="description-heading">Details</h2>
            <p className="description">{product?.description}</p>
            <StarRating
              rating={product?.rating.rate}
              totalRatings={product?.rating.count}
            />
            <p className="price">
              <span className="priceValue">${product?.price.toFixed(2)}</span>
            </p>
            <button onClick={AddToCart} className="add-card-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    );
};

export default ProductDetails;
