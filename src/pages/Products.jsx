import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import {
  FaHeart,
  FaEye,
  FaPlus,
  FaStar,
  FaRegStar,
  FaBoxOpen,
  FaSearch
} from 'react-icons/fa'

import addToCart from '../utils/addToCart'
import addToWishlist from '../utils/addToWishlist'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''

  async function getProducts() {
    try {
      setLoading(true)
      setError('')

      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/products'
      )

      setProducts(response.data.data)

    } catch (error) {
      console.log(error)
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const productName = product.title.toLowerCase()
    const categoryName = product.category?.name?.toLowerCase() || ''
    const brandName = product.brand?.name?.toLowerCase() || ''

    const searchText = search.toLowerCase().trim()

    return (
      productName.includes(searchText) ||
      categoryName.includes(searchText) ||
      brandName.includes(searchText)
    )
  })

  function renderStars(rating) {
    const roundedRating = Math.round(rating)

    return (
      <>
        {[1, 2, 3, 4, 5].map((star) =>
          star <= roundedRating ? (
            <FaStar key={star} />
          ) : (
            <FaRegStar key={star} />
          )
        )}
      </>
    )
  }

  return (
    <div className="fresh-products-page">

      {/* GREEN HEADER */}

      <section className="fresh-products-header">
        <div className="container">

          <div className="fresh-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <strong>All Products</strong>
          </div>

          <div className="fresh-header-content">

            <div className="fresh-header-icon">
              <FaBoxOpen />
            </div>

            <div>
              <h1>All Products</h1>
              <p>Explore our complete product collection</p>
            </div>

          </div>

        </div>
      </section>

      {/* PRODUCTS */}

      <section className="fresh-products-section">
        <div className="container">

          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border text-success"
                role="status"
              />
              <p className="mt-3">Loading products...</p>
            </div>

          ) : error ? (
            <div className="alert alert-danger">
              {error}
            </div>

          ) : (
            <>

              {search && (
                <div className="alert alert-light border d-flex align-items-center gap-2">
                  <FaSearch className="text-success" />

                  <span>
                    Search results for: <strong>{search}</strong>
                  </span>

                  <Link
                    to="/products"
                    className="btn btn-sm btn-outline-success ms-auto"
                  >
                    Clear
                  </Link>
                </div>
              )}

              <p className="fresh-products-count">
                Showing {filteredProducts.length} products
              </p>

              {filteredProducts.length === 0 ? (

                <div className="text-center py-5">
                  <FaSearch
                    size={45}
                    className="text-secondary mb-3"
                  />

                  <h4>No products found</h4>

                  <p className="text-muted">
                    Try searching for another product or brand.
                  </p>

                  <Link
                    to="/products"
                    className="btn btn-success mt-2"
                  >
                    View All Products
                  </Link>
                </div>

              ) : (

                <div className="fresh-products-grid">

                  {filteredProducts.map((product) => (

                    <div
                      className="fresh-product-card"
                      key={product._id}
                    >

                      {/* IMAGE */}

                      <div className="fresh-product-image-wrapper">

                        <Link to={`/products/${product._id}`}>
                          <img
                            src={product.imageCover}
                            alt={product.title}
                            className="fresh-product-image"
                          />
                        </Link>

                        {/* ACTIONS */}

                        <div className="fresh-product-actions">

                          <button
                            type="button"
                            title="Add to Wishlist"
                            aria-label="Add to Wishlist"
                            onClick={() => addToWishlist(product._id)}
                          >
                            <FaHeart />
                          </button>

                          <Link
                            to={`/products/${product._id}`}
                            title="View Product"
                            aria-label="View Product"
                          >
                            <FaEye />
                          </Link>

                        </div>

                      </div>

                      {/* INFO */}

                      <div className="fresh-product-info">

                        <p className="fresh-product-category">
                          {product.category?.name}
                        </p>

                        <Link
                          to={`/products/${product._id}`}
                          className="fresh-product-title"
                        >
                          {product.title}
                        </Link>

                        <div className="fresh-product-rating">

                          <span className="fresh-stars">
                            {renderStars(product.ratingsAverage || 0)}
                          </span>

                          <span className="fresh-rating-number">
                            {product.ratingsAverage}
                            {' '}
                            ({product.ratingsQuantity || 0})
                          </span>

                        </div>

                        <div className="fresh-product-bottom">

                          <span className="fresh-product-price">
                            {product.price} EGP
                          </span>

                          <button
                            type="button"
                            className="fresh-add-button"
                            title="Add to Cart"
                            aria-label="Add to Cart"
                            onClick={() => addToCart(product._id)}
                          >
                            <FaPlus />
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </>
          )}

        </div>
      </section>

    </div>
  )
}

export default Products
