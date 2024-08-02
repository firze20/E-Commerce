import { useQueryPurchases } from "@/hooks/purchases/useQueryPurchases";
import { useSearchParams } from "react-router-dom";
import ItemsTable from "./components/ItemsTable";
import LazySpinner from "@/components/common/loading/LazySpinner";
import Pagination from "@/components/common/pagination/Pagination";
import DatePicker from "./components/DatePicker";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState, useCallback } from "react";

const MyPurchases = () => {
  const [page, setPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Date Filters
  const filters: Record<string, string> = {
    minDate: startDate,
    maxDate: endDate,
  };

  // Query
  const { data, isLoading, isSuccess, isError } = useQueryPurchases(
    page,
    filters
  );

  // React Router Search Params
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL search params
  useEffect(() => {
    const page = searchParams.get("page");
    const minDate = searchParams.get("minDate");
    const maxDate = searchParams.get("maxDate");

    if (page) setPage(Number(page));
    if (minDate) setStartDate(minDate);
    if (maxDate) setEndDate(maxDate);
  }, [setSearchParams]);

  const updateSearchParams = useCallback((params: Record<string, string>) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      return newParams;
    });
  }, [setSearchParams]);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
    updateSearchParams({ page: page.toString() });
  }, [setPage, updateSearchParams]);

  const handleMinDateChange = useCallback((date: string) => {
    setStartDate(date);
    setPage(1);
    updateSearchParams({ minDate: date, page: '1' });
  }, [setStartDate, setPage, updateSearchParams]);

  const handleMaxDateChange = useCallback((date: string) => {
    setEndDate(date);
    setPage(1);
    updateSearchParams({ maxDate: date, page: '1' });
  }, [setEndDate, setPage, updateSearchParams]);

  return (
    <div className="overflow-x-auto">
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleMinDateChange}
        onEndDateChange={handleMaxDateChange}
        className="mt-5"
      />
      <LazySpinner show={isLoading} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {isSuccess && data ? (
        data.purchases.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-secondary font-mono text-lg">
              Your purchase history
            </h2>
            <Pagination
              totalPages={data ? data.totalPages : 1}
              currentPage={data ? data.currentPage : 1}
              onPageChange={handlePageChange}
            />

            {data.purchases.map((purchase, index) => (
              <div key={index} className="mt-5">
                <p className="text-info">{formatDate(purchase.createdAt)}</p>
                <p className="bg-neutral-600 text-neutral-50 rounded-lg">
                  Spent: {purchase.totalPrice}$
                </p>
                <ItemsTable
                  data={purchase.items}
                  className="table-zebra table-xs table-fixed w-full mt-5 text-center"
                />
              </div>
            ))}
          </div>
        ) : (
          <p>Nothing to see here</p>
        )
      ) : (
        !isLoading &&
        !isError && <p>You need to sign up or sign in to see your purchases</p>
      )}
    </div>
  );
};

export default MyPurchases;
