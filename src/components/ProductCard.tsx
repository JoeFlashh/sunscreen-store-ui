import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <>
      <div className="product-card">
        <div className="product-card-image-container">
          <img
            src={product.defaultImage}
            alt={product.name}
            className="default-image"
          />
          <img
            src={product.hoverImage}
            alt={product.name}
            className="hover-image"
          />
        </div>
        <div className="product-card-info-container">
          <h4>{product.name}</h4>
          <p>Reef Safe: {product.reefSafe ? "Yes" : "No"}</p>
          <p>${product.price.toFixed(2)}</p>
          <button className="add-to-cart-button">Add to cart</button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
