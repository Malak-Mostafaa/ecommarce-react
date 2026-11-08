import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container my-5 text-center">
      <h1 className="text-success fw-bold">
        Welcome to FreshCart 🛒
      </h1>

      <p className="text-muted mt-3">
        Discover our latest products and special offers.
      </p>

      <Link to="/products" className="btn btn-success mt-3">
        Shop Now
      </Link>
    </div>
  )
}

export default Home