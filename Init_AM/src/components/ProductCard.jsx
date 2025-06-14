function ProductCard({ product, searchQuery }) {
  return (
    <li className="productlist-card">
      <a href={product.TrackingLink} target="_blank" rel="noopener noreferrer" className="productlist-link">
        <div className="productlist-card-content">
          {product.Creative && (
            <img src={product.Creative} alt={product.Name + " image"} className="productlist-img" />
          )}
          <h3>
            {searchQuery
              ? product.Name.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) =>
                  part.toLowerCase() === searchQuery.toLowerCase() ? <mark key={i}>{part}</mark> : part
                )
              : product.Name}
          </h3>
          <p>{product.Description}</p>
          <span className="productlist-badge">
            {product.category}{product.subcategory ? ` / ${product.subcategory}` : ""}
          </span>
          <button className="productlist-btn">View Offer</button>
        </div>
      </a>
    </li>
  );
}
export default ProductCard;