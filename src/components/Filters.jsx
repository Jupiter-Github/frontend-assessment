const Filters = ({ categories, brands, filters, onChange, onReset }) => {
  return (
    <aside className="filters-panel">
      <div className="filters-heading">
        <h2>Filters</h2>
        <button type="button" className="reset-button" onClick={onReset}>
          Clear all
        </button>
      </div>

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={(event) => onChange("category", event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Price range ($)</label>
        <div className="price-inputs">
          <input
            aria-label="Minimum price"
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(event) => onChange("minPrice", event.target.value)}
          />
          <span>to</span>
          <input
            aria-label="Maximum price"
            type="number"
            min="0"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(event) => onChange("maxPrice", event.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="brand">Brand</label>
        <select
          id="brand"
          value={filters.brand}
          onChange={(event) => onChange("brand", event.target.value)}
        >
          <option value="">All brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <p className="filter-hint">Filters update the results automatically.</p>
    </aside>
  );
};

export default Filters;
