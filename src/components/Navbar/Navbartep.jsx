import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, ArrowUpRight, Leaf } from "lucide-react";
import { useCart } from "../../context/useCart.js";

function NavbarTemp() {
  const { itemCount } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <Leaf size={30} strokeWidth={1.7} />
        <span>Product App</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
          Shop
        </NavLink>

        <Link to="/cart" className="bag-link">
          <ShoppingBag size={18} />
          <span>Bag</span>
          <span className="bag-count">{itemCount}</span>
        </Link>

        <a href="https://dummyjson.com/products" target="_blank" rel="noreferrer" className="source-link">
          Source
          <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}

export default NavbarTemp;