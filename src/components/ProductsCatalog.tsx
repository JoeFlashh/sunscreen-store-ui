import { useState, useEffect, useCallback } from "react";
import { useSearch } from "../context/SearchContext";

import { LuSettings2 } from "react-icons/lu";
import SkeletonCard from "./SkeletonCard";
import type { Product } from "../data/products";
import ProductCard from "./ProductCard";
import FiltersDrawer from "./FiltersDrawer";

interface ProductsCatalogProps {
  products: Product[];
}

// Clean, readable filter functions
const filterByType = (product: Product, selectedTypes: string[]): boolean => {
  return selectedTypes.length === 0 || selectedTypes.includes(product.type);
};

const filterBySPF = (product: Product, selectedSPFs: string[]): boolean => {
  return selectedSPFs.length === 0 || selectedSPFs.includes(product.spf.toString());
};

const filterByReefSafe = (product: Product, selectedReefOptions: string[]): boolean => {
  if (selectedReefOptions.length === 0) return true;
  // Only "yes" option exists in our filter, so if selected, product must be reef safe
  return selectedReefOptions.includes("yes") ? product.reefSafe : true;
};

const filterBySearch = (product: Product, searchTerm: string): boolean => {
  return searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase());
};

function ProductsCatalog({ products }: ProductsCatalogProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [appliedFilters, setAppliedFilters] = useState<{ [key: string]: string[] }>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState(false);

  const { searchTerm } = useSearch();

  // Open drawer and set temp filters to current applied ones
  const openDrawer = () => {
    setTempSelectedFilters(appliedFilters);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  // Disable scroll when drawer is open
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

  // Handle checkbox change inside drawer - simplified
  const handleTempFilterChange = (
    groupKey: string,
    value: string,
    isChecked: boolean
  ) => {
    setTempSelectedFilters((prev) => {
      const currentGroup = prev[groupKey] || [];
      
      if (isChecked) {
        // Add value if not already present
        return {
          ...prev,
          [groupKey]: [...currentGroup, value]
        };
      } else {
        // Remove value
        return {
          ...prev,
          [groupKey]: currentGroup.filter(v => v !== value)
        };
      }
    });
  };

  // Clear all filters - no need to manually reset filteredProducts
  const handleClearFilters = () => {
    setTempSelectedFilters({});
    setAppliedFilters({});
  };

  // Apply filters and close drawer
  const applyFilters = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setAppliedFilters(tempSelectedFilters);
      setIsDrawerOpen(false);
      setIsLoading(false);
    }, 500);
  }, [tempSelectedFilters]);

  // Clean, readable filtering function
  const filterProducts = useCallback(() => {
    const filtered = products.filter((product) => {
      // Apply each filter type - clear and easy to understand
      const passesTypeFilter = filterByType(product, appliedFilters.type || []);
      const passesSPFFilter = filterBySPF(product, appliedFilters.spf || []);
      const passesReefFilter = filterByReefSafe(product, appliedFilters.reef || []);
      const passesSearchFilter = filterBySearch(product, searchTerm);

      // Product must pass ALL filters
      return passesTypeFilter && passesSPFFilter && passesReefFilter && passesSearchFilter;
    });

    setFilteredProducts(filtered);
  }, [appliedFilters, searchTerm, products]);

  // Run filtering when search term or applied filters change
  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const numberOfProducts = filteredProducts.length;
  const hasActiveFiltersInDrawer = Object.values(tempSelectedFilters).some(
    (arr) => arr.length > 0
  );

  return (
    <div className="products-catalog-container">
      {/* 1. Filters button and total count */}
      <div className="filters-container">
        <button onClick={openDrawer} className="is-drawer-open-button">
          <LuSettings2 className="filter-icon" />
          Filters
        </button>
        <p>{numberOfProducts} Total</p>
      </div>

      {/* 2. Filters Drawer */}
      {isDrawerOpen && <div className="drawer-overlay" onClick={closeDrawer}></div>}
      
      <FiltersDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        selectedFilters={tempSelectedFilters}
        hasActiveFilters={hasActiveFiltersInDrawer}
        onFilterChange={handleTempFilterChange}
        onClearFilters={handleClearFilters}
        onApplyFilters={applyFilters}
      />

      {/* 3. Product Grid */}
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