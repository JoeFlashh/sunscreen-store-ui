import { useState, useEffect, useCallback } from "react";
import { LuSettings2 } from "react-icons/lu";
import SkeletonCard from "./SkeletonCard";
import type { Product } from "../data/products";
import ProductCard from "./ProductCard";
import FiltersDrawer from "./FiltersDrawer";

interface ProductsCatalogProps {
  products: Product[];
}

function ProductsCatalog({ products }: ProductsCatalogProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState(false);

  const openDrawer = () => {
    setTempSelectedFilters(appliedFilters);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const handleTempFilterChange = (
    groupKey: string,
    value: string,
    isChecked: boolean
  ) => {
    setTempSelectedFilters((prev) => {
      const group = prev[groupKey] || [];
      if (isChecked) {
        return { ...prev, [groupKey]: [...new Set([...group, value])] };
      } else {
        return { ...prev, [groupKey]: group.filter((v) => v !== value) };
      }
    });
  };

  const handleClearFilters = () => {
    setTempSelectedFilters({});
    setAppliedFilters({});
    setFilteredProducts(products);
  };

  const applyFilters = useCallback(() => {
    setIsLoading(true);
    setIsDrawerOpen(false);

    setTimeout(() => {
      setAppliedFilters(tempSelectedFilters);

      const hasFilters = Object.values(tempSelectedFilters).some(
        (arr) => arr.length > 0
      );

      if (!hasFilters) {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product) => {
          return Object.entries(tempSelectedFilters).every(([key, values]) => {
            if (values.length === 0) return true;
            switch (key) {
              case "type":
                return values.includes(product.type);
              case "spf":
                return values.includes(product.spf.toString());
              case "reef":
                return values.includes(product.reefSafe ? "yes" : "no");
              default:
                return true;
            }
          });
        });
        setFilteredProducts(filtered);
      }
      setIsLoading(false);
    }, 500);
  }, [tempSelectedFilters, products]);

  const numberOfProducts = filteredProducts.length;
  const hasActiveFiltersInDrawer = Object.values(tempSelectedFilters).some(
    (arr) => arr.length > 0
  );

  return (
    <div className="products-catalog-container">
      {/* 1. Filters container with open button and total count */}
      <div className="filters-container">
        <button onClick={openDrawer} className="is-drawer-open-button">
          <LuSettings2 className="filter-icon" />
          Filters
        </button>
        <p>{numberOfProducts} Total</p>
      </div>

      {/* 2. Render drawer and overlay only if open */}
      {isDrawerOpen && (
        <>
          <div className="drawer-overlay" onClick={closeDrawer}></div>
          <FiltersDrawer
            isOpen={isDrawerOpen}
            onClose={closeDrawer}
            selectedFilters={tempSelectedFilters}
            hasActiveFilters={hasActiveFiltersInDrawer}
            onFilterChange={handleTempFilterChange}
            onClearFilters={handleClearFilters}
            onApplyFilters={applyFilters}
          />
        </>
      )}

      {/* 3. Products grid */}
      <div className="products-catalog-grid">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredProducts.length === 0 ? (
          <p className="no-products-message">
            No products matching your criteria.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsCatalog;
