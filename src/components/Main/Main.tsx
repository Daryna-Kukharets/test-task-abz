import { Button } from "../Button/Button";

export const Main = () => {
  const scrollToReg = () => {
    const usersSection = document.querySelector("#registration");
    usersSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="main">
      <div className="main__box">
        <h1 className="main__title">Test assignment for front-end developer</h1>
        <p className="main__text">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <div className="main__button">
          <Button name="Sign up" onClick={scrollToReg} />
        </div>
      </div>
    </div>
  );
};
