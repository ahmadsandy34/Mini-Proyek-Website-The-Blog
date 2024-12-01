import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar bg-base-100 mx-auto lg:px-16" cy-data="navbar">
      <div className="flex-1">
        <Link to="/">
          <a className="btn btn-ghost text-lg font-semibold">LumosBlog</a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-4 text-xl lg:flex hidden">
          <li>
            <Link to="/">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Newsletter</a>
          </li>
          <li>
            <a>
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-base-300 bg-black [--tglbg:theme(colors.white)]
                   checked:border-black checked:bg-white checked:[--tglbg:theme(colors.black)]"
              />
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button className="btn btn-ghost text-xl" onClick={toggleMobileMenu}>
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-center items-center h-full">
          <ul className="menu menu-vertical space-y-4 bg-white w-full h-full justify-center items-center text-lg">
            <p className="font-semibold mb-4">Your Name</p>
            <li>
              <Link to="/" onClick={toggleMobileMenu}>
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Newsletter</a>
            </li>
            <li>
              <a>
                <input
                  type="checkbox"
                  value="synthwave"
                  className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-white bg-black [--tglbg:theme(colors.white)] checked:border-black checked:bg-white checked:[--tglbg:theme(colors.black)]"
                />
              </a>
            </li>

            <button
              className="btn btn-ghost text-xl absolute bottom-1"
              onClick={toggleMobileMenu}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
