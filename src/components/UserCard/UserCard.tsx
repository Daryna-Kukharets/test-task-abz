import { useRef, useState } from "react";
import { User } from "../../api/users";
import { formatPhone } from "../../helper/formatPhone";

type Props = {
  user: User;
};
export const UserCard: React.FC<Props> = ({ user }) => {
  const { photo, name, position, email, phone } = user;

  const refs = {
    name: useRef<HTMLParagraphElement>(null),
    email: useRef<HTMLParagraphElement>(null),
  };

  const [hovered, setHovered] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });

  const checkOverflow = (ref: React.RefObject<HTMLParagraphElement | null>) => {
    if (!ref.current) {
      return false;
    }
    const el = ref.current;
    
    return Math.ceil(el.scrollWidth) > Math.ceil(el.clientWidth);
  };

  const renderTooltip = (text: string, key: "name" | "email") => {
    const isOverflow = checkOverflow(refs[key]);
    const showTooltip = hovered[key] && isOverflow;

    return (
      <div className="userCard__tooltip-wrapper">
        <p
          className={`userCard__info ${isOverflow ? "userCard__cursor" : ""}`}
          ref={refs[key]}
          onMouseEnter={() => setHovered((prev) => ({ ...prev, [key]: true }))}
          onMouseLeave={() => setHovered((prev) => ({ ...prev, [key]: false }))}
        >
          {text}
          <span className={`userCard__tooltip ${showTooltip ? "visible" : ""}`}>
            {text}
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className="userCard">
      <img src={photo} alt="avatar" className="userCard__avatar" />
      {renderTooltip(name, "name")}
      <div className="userCard__info-box">
        <p className="userCard__info">{position}</p>
        {renderTooltip(email, "email")}
        <p className="userCard__info">{formatPhone(phone).withoutDashes}</p>
      </div>
    </div>
  );
};
