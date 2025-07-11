import { LuSettings2 } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import FiltersGroups from "./FiltersGroups";

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hasActiveFilters: boolean;
  selectedFilters: { [key: string]: string[] };
  onFilterChange: (groupKey: string, value: string, isChecked: boolean) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void; // New prop for applying filters
}

function FiltersDrawer({
  isOpen,
  onClose,
  hasActiveFilters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  onApplyFilters,
}: FiltersDrawerProps) {
  // Calculate the total number of temporary filters selected
  const totalSelectedFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className={`filters-drawer ${isOpen ? "open" : ""}`}>
      <div className="filters-drawer-header">
        <div className="filters-drawer-header-flex">
          <p>
            <LuSettings2 className="drawer-icon" />
            Filters
          </p>
          <button onClick={onClose} className="is-drawer-closed-button">
            <MdClose />
          </button>
        </div>
      </div>
      <FiltersGroups
        selectedFilters={selectedFilters}
        onFilterChange={onFilterChange}
      />
      {/* Show clear and apply buttons only if there are active filters in the drawer */}
      {hasActiveFilters && (
        <div className="clear-apply-filters-buttons-container">
          <button onClick={onClearFilters} className="clear-filters-button">
            Clear ({totalSelectedFilterCount}){" "}
            {/* Display count of selected filters */}
          </button>
          <button onClick={onApplyFilters} className="apply-filters-button">
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default FiltersDrawer;
