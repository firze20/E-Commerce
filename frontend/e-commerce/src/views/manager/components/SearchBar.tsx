type SearchBarProps = {
  search: string;
  handleSearch: (search: string) => void;
};

const SearchBar = ({ search, handleSearch }: SearchBarProps) => {

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2 my-5">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>
    </div>
  );
};

export default SearchBar;
