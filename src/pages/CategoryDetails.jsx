import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import addToCart from '../utils/addToCart'

function CategoryDetails() {
  const { id } = useParams()
  const [products, setProducts] = useState([])

  async function getCategoryProducts() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
      )

      setProducts(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategoryProducts()
  }, [id])

  return (
    <div className="container my-5">

      <h2 className="mb-4">Category Products</h2>

      <div className="row g-4">

        {products.map((product) => (
          <div className="col-md-3" key={product._id}>

            <div className="card h-100 border-0">

              <Link to={`/products/${product._id}`}>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="card-img-top"
                />
              </Link>

              <div className="card-body">

                <p className="text-success">
                  {product.category.name}
                </p>

                <h6>{product.title.slice(0, 40)}</h6>

                <div className="d-flex justify-content-between">
                  <span>{product.price} EGP</span>
                  <span>⭐ {product.ratingsAverage}</span>
                </div>

                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={() => addToCart(product._id)}
                >
                  Add to Cart
                </button>

              </div>
            </div>

          </div>
        ))}

      </div>

      {products.length === 0 && (
        <p className="text-center mt-5">
          No products found in this category.
        </p>
      )}

    </div>
  )
}

export default CategoryDetails