type ButtonProps = {
    buttonText: string;
    onClick: () => void;
    className?: string;
    isLoading?: boolean;
}

const Button = ({buttonText}: ButtonProps) => {
  return (
    <button>
      {buttonText}
    </button>
  )
}

export default Button
