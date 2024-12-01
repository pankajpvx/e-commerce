import { useLocation, useNavigate } from "react-router";
import FilterProducts from "../components/FilterProducts";
import { useEffect, useState } from "react";
import { ApiManager } from "../Api/ApiManager";
import { StarRating } from "../components/Rating";
import { Product } from "../ApiData";
import "../style/home.css";
import { Search } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const location = useLocation();

  console.log("search", Search);

  const getProducts = async (selectedCategories) => {
    setLoader(true);
    try {
      const res = await ApiManager.getProducts(selectedCategories);
      setProducts(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const getAllCategaries = async () => {
    try {
      const res = await ApiManager.getCategories();
      setCategories(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const items = query.get("categories")?.split(",") || [];
    if (items.length > 0) setSelectedCategories(items);
    getProducts(items);
  }, [location.search]);

  useEffect(() => {
    getAllCategaries();
  }, []);

  const onProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <section className="container home-container">
      {!loader ? (
        <>
          <FilterProducts
            categories={categories}
            selectedCategories={selectedCategories}
            setFilter={setSelectedCategories}
          />
          <div className="flex products-container">
            {products.map((item: Product) => (
              <div key={item.id} className="flex product-card">
                <div
                  className="image-container"
                  onClick={() => onProductClick(item.id)}
                >
                  <img className="product-image" src={item.image} />
                </div>
                <div className="product-title">{item.title}</div>
                <StarRating
                  rating={item.rating.rate}
                  totalRatings={item.rating.count}
                />

                <p className="price">
                  <span className="priceValue">${item.price.toFixed(2)}</span>
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </section>
  );
};

export default Home;
