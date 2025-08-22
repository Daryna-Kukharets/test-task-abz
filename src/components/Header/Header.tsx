import { Button } from "../Button/Button";

export const Header = () => {
  const scrollToUsers = () => {
    const usersSection = document.querySelector("#users");
    usersSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToReg = () => {
    const usersSection = document.querySelector("#registration");
    usersSection?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className="header">
      <div className="header__box">
        <img src="/images/icons/logo.svg" alt="logo" className="header__logo" />

        <div className="header__buttons">
          <Button name="Users" onClick={scrollToUsers} />
          <Button name="Sign up" onClick={scrollToReg} />
        </div>
      </div>
    </div>
  );
};
