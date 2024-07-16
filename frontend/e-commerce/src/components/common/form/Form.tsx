import React, { ReactNode, FormEventHandler } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  children: ReactNode;
  className?: string;
  onSubmit: SubmitHandler<T>;
};

const Form = <T extends FieldValues>({ children, className, onSubmit }: FormProps<T>) => {
  const methods = useForm<T>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    methods.handleSubmit(onSubmit)();
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;