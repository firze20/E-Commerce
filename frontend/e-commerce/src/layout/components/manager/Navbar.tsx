import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
      <li>
        <Link to={"/manager/items"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5c.71 0 1.39.15 2 .42A4.9 4.9 0 0 1 12 1c2.76 0 5 2.24 5 5zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6m10 2V6c0-1.65-1.35-3-3-3h-.02A4.98 4.98 0 0 1 13 6v2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22"
            />
          </svg>
          Items
        </Link>
      </li>
      <li>
        <Link to={"/manager/categories"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 4a2 2 0 1 1-4 0a2 2 0 0 1 4 0m16 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m0 16a2 2 0 1 1-4 0a2 2 0 0 1 4 0M6 20a2 2 0 1 1-4 0a2 2 0 0 1 4 0M20 6v12m-2 2H6M18 4H6M4 6v12m12.5-9c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54C15.699 7.5 15.466 7.5 15 7.5H9c-.466 0-.699 0-.883.076a1 1 0 0 0-.54.541C7.5 8.301 7.5 8.534 7.5 9s0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077h6c.466 0 .699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883m0 6c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54c-.184-.077-.417-.077-.883-.077H9c-.466 0-.699 0-.883.076a1 1 0 0 0-.54.541c-.077.184-.077.417-.077.883s0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077h6c.466 0 .699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883"
            />
          </svg>
          Categories
        </Link>
      </li>
      <li>
        <Link to={"/manager/new-item"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7.007 12a.75.75 0 0 1 .75-.75h3.493V7.757a.75.75 0 0 1 1.5 0v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1-.75-.75"
            />
          </svg>
          New item
        </Link>
      </li>
      <li>
        <Link to={"/manager/new-category"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.2 5c.6 0 1.2 0 1.7.1c.14 1.6.18 4.32-.72 6.9c.71 0 1.38.17 2 .41c1.46-4.51.52-9.11.52-9.11S19.3 3 17.2 3c-5.5 0-15.6 2.1-14 17.8c1.1.1 2.2.2 3.2.2c2.35 0 4.34-.31 6-.84c-.24-.62-.4-1.29-.4-1.99c-1.59.55-3.47.83-5.6.83H5.1c-.2-4.6.7-8.2 2.8-10.5C10.4 5.6 14.4 5 17.2 5M17 7C7 7 7 17 7 17C11 9 17 7 17 7m0 10h-3v2h3v3h2v-3h3v-2h-3v-3h-2z"
            />
          </svg>
          New Category
        </Link>
      </li>
      <li>
        <Link to={"/shop"}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3.28 2h17.44l.972 2.914c.181.543.391 1.332.163 2.154A4 4 0 0 1 21 8.646V20h1v2H2v-2h1V8.646A4 4 0 0 1 2 6v-.162zM5 9.874V20h3v-7h8v7h3V9.874a4 4 0 0 1-4-1.228A4 4 0 0 1 12 10a4 4 0 0 1-3-1.354a3.99 3.99 0 0 1-4 1.228M10 6a2 2 0 1 0 4 0V4h-4zM8 4H4.72l-.715 2.146c.039.533.285 1.008.662 1.345A2 2 0 0 0 8 6zm8 0v2a2 2 0 0 0 3.928.535c.059-.213.026-.512-.133-.989L19.279 4zm-2 16v-5h-4v5z"
            />
          </svg>
          Return to shop
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
