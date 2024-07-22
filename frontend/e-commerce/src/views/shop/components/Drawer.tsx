import { CategoryResponse } from "@/api/shop/storeApi";
import { useState } from "react";

type DrawerProps = {
  categories: CategoryResponse;
  onFiltersChange: (filters: Record<string, any>) => void;
};

const Drawer = ({ categories, onFiltersChange }: DrawerProps) => {
  const [name, setName] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<string | null>(null);

  const handleApplyFilters = () => {
    const filters: Record<string, any> = {};
    
    // if (name) filters.name = name;
    // if (category) filters.category = category;
    // if (minPrice) filters.minPrice = Number(minPrice);
    // if (maxPrice) filters.maxPrice = Number(maxPrice);
    
    // onFiltersChange(filters);
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
              value={minPrice! || 0}
              className="range range-primary"
              step="25"
              onChange={(e) => setMinPrice(e.target.value)}
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
              value={maxPrice! || 100}
              className="range range-secondary"
              step="25"
              onChange={(e) => setMaxPrice(e.target.value)}
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
            <button className="btn btn-active btn-secondary" onClick={() => handleApplyFilters()}>Apply Filters</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;