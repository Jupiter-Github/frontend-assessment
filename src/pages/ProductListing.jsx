import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters.jsx";
import ProductCard from "../components/ProductCard.jsx";

const PAGE_SIZE = 12;
const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    brand: searchParams.get("brand") || "",
  };
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch("https://dummyjson.com/products?limit=0"),
          fetch("https://dummyjson.com/products/categories"),
        ]);
        if (!productsResponse.ok || !categoriesResponse.ok)
          throw new Error("Unable to load products. Please try again.");
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        setProducts(productsData.products || []);
        setCategories(
          (categoriesData || []).map((item) =>
            typeof item === "string" ? { slug: item, name: item } : item,
          ),
        );
      } catch (err) {
        setError(err.message || "Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const brands = useMemo(
    () =>
      [
        ...new Set(products.map((product) => product.brand).filter(Boolean)),
      ].sort(),
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        if (filters.category && product.category !== filters.category)
          return false;
        if (filters.brand && product.brand !== filters.brand) return false;
        if (filters.minPrice !== "" && product.price < Number(filters.minPrice))
          return false;
        if (filters.maxPrice !== "" && product.price > Number(filters.maxPrice))
          return false;
        return true;
      }),
    [
      products,
      filters.category,
      filters.brand,
      filters.minPrice,
      filters.maxPrice,
    ],
  );

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const visibleProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const changePage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    if (nextPage === 1) next.delete("page");
    else next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="page-intro">
        <div>
          <p className="eyebrow">THE EVERYDAY STORE</p>
          <h1>Find your next favourite.</h1>
          <p className="intro-copy">
            Browse the collection and filter down to what you need.
          </p>
        </div>
      </section>

      <div className="listing-layout">
        <Filters
          categories={categories}
          brands={brands}
          filters={filters}
          onChange={updateFilter}
          onReset={resetFilters}
        />
        <section className="results-section">
          <div className="results-header">
            <div>
              <h2>All products</h2>
              <p>
                {loading
                  ? "Loading collection…"
                  : `${filteredProducts.length} products found`}
              </p>
            </div>
            <span className="sort-label">
              Page {page} of {pageCount}
            </span>
          </div>

          {loading && (
            <div className="message-panel">
              <span className="loader" /> <p>Loading products…</p>
            </div>
          )}
          {!loading && error && (
            <div className="message-panel error-panel">
              <h3>Could not load products</h3>
              <p>{error}</p>
              <button
                className="primary-button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}
          {!loading && !error && visibleProducts.length === 0 && (
            <div className="message-panel">
              <h3>No products found</h3>
              <p>Try changing your filters.</p>
              <button className="primary-button" onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          )}
          {!loading && !error && visibleProducts.length > 0 && (
            <>
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <nav className="pagination" aria-label="Product pages">
                <button
                  onClick={() => changePage(page - 1)}
                  disabled={page <= 1}
                >
                  ← Previous
                </button>
                <span>
                  {page} / {pageCount}
                </span>
                <button
                  onClick={() => changePage(page + 1)}
                  disabled={page >= pageCount}
                >
                  Next →
                </button>
              </nav>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default ProductListing;
