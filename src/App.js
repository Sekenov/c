import { Routes, Route } from "react-router-dom";
import Preview from "./components/preview/Preview";
import Menu from "./components/menu/Menu";
import About from "./components/about/About";
import Cart from "./components/cart/Cart";
import Order from "./components/order/Order";
import Catalog from "./components/catalog/Catalog";
import Map from "./components/map/Map";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import AddProduct from "./components/addProduct/AddProduct";
function App() {
  return (
    <>
      <Preview />
      <Menu />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/map" element={<Map />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
