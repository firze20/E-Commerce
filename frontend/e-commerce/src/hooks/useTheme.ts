import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/**
 * Custom hook for managing the theme state.
 * @returns A tuple containing the current theme and a function to toggle the theme.
 */
const useTheme = (): [Theme, () => void] => {
    const getSystemTheme = (): Theme => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    };

    const [theme, setTheme] = useState<Theme>(getSystemTheme());

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const root = document.querySelector('html');
        if (root) {
            root.setAttribute('data-theme', theme);
        }
    }, [theme]);

    return [theme, toggleTheme];
};

export default useTheme;