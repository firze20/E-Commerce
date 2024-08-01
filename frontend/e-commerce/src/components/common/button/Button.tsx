type ButtonProps = {
    buttonText: string;
    onClick: () => void;
    className?: string;
    isLoading?: boolean;
}

const Button = ({buttonText, onClick, className, isLoading}: ButtonProps) => {
  return (
    <button>
      {buttonText}
    </button>
  )
}

export default Button
