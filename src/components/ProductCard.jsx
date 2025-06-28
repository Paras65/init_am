function ProductCard({ product, searchQuery }) {
  return (
    
    <li className="productlist-card">
     
      <a href={product.link} target="_blank" rel="noopener noreferrer" className="productlist-link">
        <div className="productlist-card-content">
          {product.image && (
            <img src={product.image} alt={product.name + " image"} className="productlist-img" />
          )
          
          }
          <h3>
            {searchQuery
              ? product.name.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) =>
                  part.toLowerCase() === searchQuery.toLowerCase() ? <mark key={i}>{part}</mark> : part
                )
              : product.name}
          </h3>
          <p>{product.description}</p>
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