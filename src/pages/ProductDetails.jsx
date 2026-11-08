import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import addToCart from '../utils/addToCart'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  async function getProductDetails() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      )

      setProduct(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [id])

  if (!product) {
    return <h3 className="text-center mt-5">Loading...</h3>
  }

  return (
    <div className="container my-5">
      <div className="row align-items-center">

        <div className="col-md-4">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-100"
          />
        </div>

        <div className="col-md-8">
          <h2>{product.title}</h2>

          <p className="text-muted">
            {product.description}
          </p>

          <p className="text-success">
            {product.category.name}
          </p>

          <div className="d-flex justify-content-between my-3">
            <span>{product.price} EGP</span>
            <span>⭐ {product.ratingsAverage}</span>
          </div>

          <button
            className="btn btn-success w-100"
            onClick={() => addToCart(product._id)}
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductDetails