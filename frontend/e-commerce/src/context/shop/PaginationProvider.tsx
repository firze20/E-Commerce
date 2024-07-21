import { createContext, useContext, useState, ReactNode } from 'react';

type PaginationContextType = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};