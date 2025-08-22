type Props = {
  name: string;
  width?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({ 
  name, 
  width = '100px',
  onClick,
  disabled,
}) => {
  return (
    <button 
      type="button" 
      className={`button ${disabled ? "button--disabled" : ""}`}
      style={{width}}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
