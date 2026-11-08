import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Brands() {
  const [brands, setBrands] = useState([])

  async function getBrands() {
    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/brands'
      )

      setBrands(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <div className="container my-5">
      <h2 className="text-center text-success mb-4">All Brands</h2>

      <div className="row g-4">
        {brands.map((brand) => (
          <div className="col-md-3" key={brand._id}>
            <Link
              to={`/brands/${brand._id}`}
              className="text-decoration-none"
            >
              <div className="card h-100 text-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="card-img-top"
                />

                <div className="card-body">
                  <h5 className="text-success">{brand.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Brands