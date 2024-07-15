import React, { ReactNode } from 'react';

type FormProps = {
    children: ReactNode;
    className?: string;
};

const Form = ({ children, className }: FormProps) => {
    return <form className={className}>{children}</form>;
};

export default Form;