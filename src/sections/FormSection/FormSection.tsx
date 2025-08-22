import { useState } from "react";
import { Form } from "../../components/Form/Form";

type Props = {
  onUserRegistered: () => void;
};
export const FormSection: React.FC<Props> = ({ onUserRegistered }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleUserRegistered = () => {
    setIsRegistered(true);
    onUserRegistered();
  };

  return (
    <section id="registration" className="formSection">
      <div className="formSection__box">
        {isRegistered ? (
          <>
          <h1 className="formSection__title">User successfully registered</h1>
          <img src="images/success.svg" alt="success" className="formSection__img"/>
          </>
        ) : (
          <>
          <h1 className="formSection__title">Working with POST request</h1>
          <Form onUserRegistered={handleUserRegistered} />
          </>
        )}
      </div>
    </section>
  );
};
