import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Categories() {
  const [categories, setCategories] = useState([])

  async function getCategories() {
    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/categories'
      )

      setCategories(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">All Categories</h2>

      <div className="row g-4">
        {categories.map((category) => (
          <div className="col-md-4" key={category._id}>

            <Link
              to={`/categories/${category._id}`}
              className="text-decoration-none"
            >
              <div className="card h-100">

                <img
                  src={category.image}
                  alt={category.name}
                  className="card-img-top category-img"
                />

                <div className="card-body text-center">
                  <h4 className="text-success">
                    {category.name}
                  </h4>
                </div>

              </div>
            </Link>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories