import HeroBanner from "../components/HeroBanner";
import ProductsCatalog from "../components/ProductsCatalog";
import products from "../data/products";

function HomePage() {
  return (
    <>
      <HeroBanner />
      <ProductsCatalog products={products} />
    </>
  );
}

export default HomePage;
