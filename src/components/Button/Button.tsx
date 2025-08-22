type Props = {
  name: string;
  width?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  disabled?: boolean;
  href?: string;
};

export const Button: React.FC<Props> = ({
  name,
  width = "100px",
  onClick,
  disabled,
  href,
}) => {
  return href ? (
    <a
      href={href}
      className="button"
    >
      {name}
    </a>
  ) : (
    <button
      type="button"
      className={`button ${disabled ? "button--disabled" : ""}`}
      style={{ width }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
