import { Button } from "../Button/Button";
import mobile from "../../assets/mainSection-bg-mobile.png";
import tablet from "../../assets/mainSection-bg-tablet.png";
import desktop from "../../assets/mainSection-bg-desktop.png";
import largeDesktop from "../../assets/mainSection-bg-large-desktop.png";

export const Main = () => {
  return (
    <div className="main">
      <picture className="main__bg">
        <source
          srcSet={largeDesktop}
          media="(min-width: 1170px)"
          type="image/webp"
        />
        <source
          srcSet={desktop}
          media="(min-width: 1024px)"
          type="image/webp"
        />
        <source
          srcSet={tablet}
          media="(min-width: 768px)"
          type="image/webp"
        />
        <img
          src={mobile}
          alt="background"
          className="main__img"
          loading="lazy"
        />
      </picture>

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
          <Button name="Sign up" href="#registration" />
        </div>
      </div>
    </div>
  );
};
