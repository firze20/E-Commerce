import { useState, useEffect } from "react";

interface Props {
  show: boolean;
  delay?: number;
}

/**
 * Renders a skeleton loading component.
 * @param {Props} props - The component props.
 * @param {boolean} props.show - Determines whether to show the skeleton or not. Default is false.
 * @param {number} props.delay - The delay in milliseconds before showing the skeleton. Default is 0.
 * @returns {JSX.Element | null} The skeleton loading component.
 */
const Skeleton = (props: Props): JSX.Element | null => {
  const { show = false, delay = 0 } = props;

  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!show) {
      setShowSkeleton(false);
      return;
    }

    if (delay === 0) {
      setShowSkeleton(true);
    } else {
      timeout = setTimeout(() => {
        setShowSkeleton(true);
      }, delay);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [show, delay]);

  return showSkeleton ? (
    <div className="flex w-full flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      Loading
    </div>
  ) : null;
};

export default Skeleton;
