import { Link, useLocation } from "react-router-dom";

const ProductCard = ({ product }) => {
  const location = useLocation();
  return (
    <Link
      to={`/product/${product.id}${location.search}`}
      className="product-card"
    >
      <div className="product-image-wrap">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          loading="lazy"
        />
      </div>
      <div className="product-card-content">
        <span className="product-category">{product.category}</span>
        <h3>{product.title}</h3>
        <div className="product-card-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="rating">
            <span aria-hidden="true">★</span> {product.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
