import { createContext, ReactNode, useState, useContext } from 'react';

// Create a new context for the filters
export const FilterContext = createContext<Record<string, any>>({});

// Create the FilterProvider component
export const FilterProvider = ({ children }: { children: ReactNode}) => {
    const [filters, setFilters] = useState<Record<string, any>>({});

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

/**
 * Custom hook that provides access to the filter context.
 * @returns The filter context.
 * @throws {Error} If used outside of a FilterProvider.
 */
export const useFilters = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
}