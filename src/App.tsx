import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./style/app.css";
import AppLayout from "./components/AppLayout";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
