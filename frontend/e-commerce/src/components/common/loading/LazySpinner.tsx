import { useState, useEffect } from "react";

interface Props {
  show: boolean;
  delay?: number;
}

/**
 * A component that renders a spinner lazily based on the provided props.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Determines whether the spinner should be shown or not. Default is `false`.
 * @param {number} props.delay - The delay in milliseconds before showing the spinner. Default is `0`.
 * @returns {JSX.Element | null} The rendered spinner element or `null` if `showSpinner` is `false`.
 */
const LazySpinner = (props: Props): JSX.Element | null => {
    const { show = false, delay = 0 } = props;

    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (!show) {
            setShowSpinner(false);
            return;
        }

        if (delay === 0) {
            setShowSpinner(true);
        } else {
            timeout = setTimeout(() => {
                setShowSpinner(true);
            }, delay);
        }

        return () => clearTimeout(timeout);
    }, [show, delay]);

    return showSpinner ? (
        <span className="loading loading-spinner text-primary loading-lg">Loading</span>
    ) : null
};

export default LazySpinner;
