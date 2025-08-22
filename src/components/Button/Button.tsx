type Props = {
  name: string;
  width?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  disabled?: boolean;
  href?: string;
}

export const Button: React.FC<Props> = ({ 
  name, 
  width = '100px',
  onClick,
  disabled,
  href
}) => {
  return (
    <a
      href={href} 
      type="button" 
      className={`button ${disabled ? "button--disabled" : ""}`}
      style={{width}}
      onClick={onClick}
    >
      {name}
    </a>
  );
};
