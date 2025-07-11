import { HiOutlineShoppingBag } from "react-icons/hi2";

import { Link } from "react-router-dom";

function Navbar() {
  const cartItemCount = 0;

  return (
    <div className="navbar-outer-container">
      <nav className="navbar-inner-container">
        <Link to="/">
          <p className="sunsmart-title">Sunsmart</p>
        </Link>
        <div>
          <Link to="/cart" className="shopping-bag">
            <HiOutlineShoppingBag />
            {cartItemCount > 0 && (
              <span className="shopping-bag-count">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
