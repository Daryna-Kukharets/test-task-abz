import { Button } from "../Button/Button";
import logo from "../../assets/icons/logo.svg";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__box">
        <img src={logo} alt="logo" className="header__logo" />

        <div className="header__buttons">
          <Button name="Users" href="#users" />
          <Button name="Sign up" href="#registration" />
        </div>
      </div>
    </div>
  );
};
