import { FC, SVGProps } from 'react';

interface SvgProps extends SVGProps<SVGSVGElement> {
    // Add any additional props you need for your SVG component
    // For example, you can add a `color` prop to change the SVG color
    color?: string;
}

const Svg: FC<SvgProps> = ({ color, ...rest }) => {
    return (
        <svg {...rest} fill={color} xmlns="http://www.w3.org/2000/svg">
            {/* Add your SVG content here */}
        </svg>
    );
};

export default Svg;