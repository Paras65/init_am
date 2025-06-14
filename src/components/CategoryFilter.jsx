import "./CategoryFilter.css";

function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <div className="category-filter-wrapper">
      <label htmlFor="category-select" className="category-filter-label">
        Filter:
      </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={e => onChange(e.target.value)}
        className="productlist-category-filter"
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {categories.map(cat =>
          cat.sub && cat.sub.length > 0 ? (
            <optgroup key={cat.name} label={cat.name}>
              {cat.sub.map(sub => (
                <option key={cat.name + "-" + sub} value={`${cat.name}:${sub}`}>
                  {sub}
                </option>
              ))}
            </optgroup>
          ) : (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          )
        )}
      </select>
    </div>
  );
}
export default CategoryFilter;