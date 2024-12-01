import { useNavigate } from "react-router";

const FilterProducts = ({ categories, selectedCategories, setFilter }) => {
  const navigate = useNavigate();

  const handleSetCategories = (item) => {
    setFilter([item]);
  };

  const resetFliter = () => {
    setFilter([]);
    navigate(`/`);
  };

  const handleSetQueryData = () => {
    if (selectedCategories.length === 0) return resetFliter();
    const queryString = new URLSearchParams({
      categories: selectedCategories.join(","),
    }).toString();
    navigate(`/?${queryString}`);
  };

  const renderSelected = (item) => {
    if (selectedCategories.includes(item)) return "selected-category";
  };

  if (categories) {
    return (
      <div className="categories-container flex">
        <div
          onClick={resetFliter}
          className={`category-box ${
            selectedCategories.length === 0 && "selected-category"
          }`}
        >
          All Categories
        </div>
        {categories.map((item, index) => (
          <div
            className={`category-box ${renderSelected(item)} `}
            key={index}
            onClick={() => handleSetCategories(item)}
          >
            {item}
          </div>
        ))}
        <div className="category-box filter-btn" onClick={handleSetQueryData}>
          Fliter
        </div>
      </div>
    );
  }
};

export default FilterProducts;
