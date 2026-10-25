import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Product could not be found.");
        const data = await response.json();
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Unable to load this product.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadProduct();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(`/${location.search}`);
  };

  if (loading)
    return (
      <div className="message-panel">
        <span className="loader" />
        <p>Loading product details…</p>
      </div>
    );
  if (error || !product)
    return (
      <div className="message-panel">
        <h2>Unable to show product</h2>
        <p>{error}</p>
        <button className="primary-button" onClick={goBack}>
          Back to products
        </button>
      </div>
    );

  return (
    <section className="detail-page">
      <button className="back-button" onClick={goBack}>
        ← Back to products
      </button>
      <div className="detail-card">
        <div className="detail-image-wrap">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
          />
        </div>
        <div className="detail-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="detail-rating">
            <span>★ {product.rating}</span>
            <span>{product.stock > 0 ? "In stock" : "Out of stock"}</span>
          </div>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-specs">
            <div>
              <span>Brand</span>
              <strong>{product.brand || "Not specified"}</strong>
            </div>
            <div>
              <span>Category</span>
              <strong>{product.category}</strong>
            </div>
            <div>
              <span>Availability</span>
              <strong>
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </strong>
            </div>
          </div>
          <button className="primary-button detail-back-cta" onClick={goBack}>
            Continue browsing
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
