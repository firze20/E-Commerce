type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  };
  
  const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="join mb-12">
        {pages.map((page) => (
          <input
            key={page}
            className={`join-item btn btn-square ${currentPage === page ? "btn-primary" : ""}`}
            type="radio"
            name="options"
            aria-label={page.toString()}
            defaultChecked={currentPage === page}
            onClick={() => onPageChange(page)}
          />
        ))}
      </div>
    );
  };
  
  export default Pagination;