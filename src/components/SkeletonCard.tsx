function SkeletonCard() {
  return (
    <div className="product-card skeleton">
      <div className="product-card-image-container skeleton-image" />
      <div className="product-card-info-container">
        <div className="skeleton-line skeleton-name" />
        <div className="skeleton-line skeleton-text" />
        <div className="skeleton-line skeleton-price" />
        <div className="skeleton-button" />
      </div>
    </div>
  );
}

export default SkeletonCard;
