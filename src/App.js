import { Routes, Route } from "react-router-dom";
import Preview from "./components/preview/Preview";
import Menu from "./components/menu/Menu";
import About from "./components/about/About";
import Cart from "./components/cart/Cart";
import Order from "./components/order/Order";
import Catalog from "./components/catalog/Catalog";
import Map from "./components/map/Map";
import Register from "./components/register/Register";
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
      </Routes>
    </>
  );
}

export default App;
