import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  FaShoppingCart,
  FaRegHeart,
  FaTruck,
  FaGift,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaUserPlus,
  FaSearch,
  FaHeadset,
  FaBoxOpen,
  FaSignOutAlt
} from 'react-icons/fa'

function Navbar() {
  const navigate = useNavigate()

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [search, setSearch] = useState('')

  useEffect(() => {
    function updateToken() {
      setToken(localStorage.getItem('token'))
    }

    window.addEventListener('authChange', updateToken)

    return () => {
      window.removeEventListener('authChange', updateToken)
    }
  }, [])

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')

    setToken(null)
    window.dispatchEvent(new Event('authChange'))
    navigate('/login')
  }

  function handleSearch(e) {
    e.preventDefault()

    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`)
    } else {
      navigate('/products')
    }
  }

  return (
    <header className="fresh-site-header">

      {/* TOP BAR */}
      <div className="fresh-topbar">
        <div className="container fresh-topbar-content">

          <div className="fresh-topbar-left">
            <span>
              <FaTruck className="text-success me-2" />
              Free Shipping on Orders 500 EGP
            </span>

            <span>
              <FaGift className="text-success me-2" />
              New Arrivals Daily
            </span>
          </div>

          <div className="fresh-topbar-right">
            <span>
              <FaPhoneAlt className="me-2" />
              +1 (800) 123-4567
            </span>

            <span>
              <FaEnvelope className="me-2" />
              support@freshcart.com
            </span>

            {!token && (
              <>
                <Link to="/login">
                  <FaUser className="me-1" />
                  Sign In
                </Link>

                <Link to="/register">
                  <FaUserPlus className="me-1" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="navbar navbar-expand-lg fresh-main-navbar">
        <div className="container">

          {/* LOGO */}
          <Link className="fresh-logo" to="/">
            <FaShoppingCart className="fresh-logo-icon" />
            <span>FreshCart</span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMenu">

            {/* SEARCH */}
            <form
              className="fresh-search-form"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button type="submit" aria-label="Search products">
                <FaSearch />
              </button>
            </form>

            {/* LINKS */}
            <ul className="navbar-nav fresh-nav-links">

              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Shop
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>

            </ul>

            {/* RIGHT SIDE */}
            <div className="fresh-nav-right">

              <div className="fresh-support">
                <span className="fresh-support-icon">
                  <FaHeadset />
                </span>

                <span>
                  <small>Support</small>
                  <strong>24/7 Help</strong>
                </span>
              </div>

              <Link
                to="/wishlist"
                className="fresh-header-icon-button"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <FaRegHeart />
              </Link>

              <Link
                to="/cart"
                className="fresh-header-icon-button"
                title="Cart"
                aria-label="Shopping cart"
              >
                <FaShoppingCart />
              </Link>

              {token ? (
                <div className="dropdown">

                  <button
                    className="btn fresh-signin-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUser className="me-2" />
                    My Account
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">

                    <li>
                      <Link className="dropdown-item" to="/orders">
                        <FaBoxOpen className="me-2" />
                        My Orders
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/change-password"
                      >
                        Change Password
                      </Link>
                    </li>

                    <li><hr className="dropdown-divider" /></li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={logout}
                      >
                        <FaSignOutAlt className="me-2" />
                        Logout
                      </button>
                    </li>

                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn fresh-signin-btn">
                  <FaUser className="me-2" />
                  Sign In
                </Link>
              )}

            </div>

          </div>
        </div>
      </nav>

    </header>
  )
}

export default Navbar