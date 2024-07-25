import { CategoryResponse } from "@/api/shop/storeApi";
import { useCallback, useEffect, useState } from "react";
import { useFilters } from "@/context/shop/FilterProvider";
import debounce from "lodash/debounce";

type DrawerProps = {
  categories: CategoryResponse;
  onFiltersChange: (filters: Record<string, any>) => void;
};

const Drawer = ({ categories, onFiltersChange }: DrawerProps) => {
  const { filters } = useFilters();
  
  const [name, setName] = useState<string | null>(filters.name || null);
  const [category, setCategory] = useState<string | null>(filters.category || null);
  const [minimumPrice, setMinimumPrice] = useState<string | null>(filters.minimumPrice || null);
  const [maximumPrice, setMaximumPrice] = useState<string | null>(filters.maximumPrice || null);

  const debouncedOnFiltersChange = useCallback(debounce(onFiltersChange, 300), [onFiltersChange]);

  useEffect(() => {
    const newFilters = {
      ...(name && { name }),
      ...(category && { category }),
      ...(minimumPrice && { minimumPrice: minimumPrice }),
      ...(maximumPrice && { maximumPrice: maximumPrice }),
    };
    
    debouncedOnFiltersChange(newFilters);
  }, [name, category, minimumPrice, maximumPrice, debouncedOnFiltersChange]);

  const emptyFilters = () => {
    setName(null);
    setCategory(null);
    setMinimumPrice(null);
    setMaximumPrice(null);
    onFiltersChange({});
  };

  return (
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Search Filters
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <label htmlFor="search">Name:</label>
            <input type="text" id="search" value={name! || ""} onChange={(e) => setName(e.target.value)} />
          </li>
          <li>
            <label htmlFor="category">Category:</label>
            <select
              className="select select-primary w-full max-w-xs"
              onChange={(e) => setCategory(e.target.value)}
              value={category! || ""}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="minimumPrice">Minimum Price:</label>
            <input
              type="range"
              min={0}
              max="100"
              value={minimumPrice! || 0}
              className="range range-primary"
              step="25"
              onChange={(e) => setMinimumPrice(e.target.value)}
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>0$</span>
              <span>25$</span>
              <span>50$</span>
              <span>75$</span>
              <span>100$</span>
            </div>
          </li>
          <li>
            <label htmlFor="maximumPrice">Maximum Price:</label>
            <input
              type="range"
              min={0}
              max="100"
              value={maximumPrice! || 100}
              className="range range-secondary"
              step="25"
              onChange={(e) => setMaximumPrice(e.target.value)}
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>0$</span>
              <span>25$</span>
              <span>50$</span>
              <span>75$</span>
              <span>100$</span>
            </div>
          </li>
          <li>
            <button className="btn btn-active btn-primary" onClick={emptyFilters}>Empty Filters</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;