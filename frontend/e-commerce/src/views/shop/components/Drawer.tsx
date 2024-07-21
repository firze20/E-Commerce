const Drawer = () => {
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
              <input type="text" id="search" />
          </li>
          <li>
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" />
          </li>
          <li>
            <label htmlFor="minimum_price">Minimum Price:</label>
            <input type="text" id="minimum_price" />
          </li>
          <li>
            <label htmlFor="max_price">Maximum Price:</label>
            <input type="text" id="max_price" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
