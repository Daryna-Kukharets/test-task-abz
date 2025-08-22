import React, { useState } from "react";
import "./styles.scss";
import { MainSection } from "./sections/MainSection/MainSection";
import { UsersSection } from "./sections/UsersSection/UsersSection";
import { FormSection } from "./sections/FormSection/FormSection";

export const App = () => {
   const [resetUsersFunction, setResetUsersFunction] = useState<(() => void) | null>(null);

  const handleUserRegistered = () => {
    resetUsersFunction?.();
  };

  const handleResetToFirstPage = (resetFn: () => void) => {
    setResetUsersFunction(() => resetFn);
  };
  return (
    <>
      <MainSection />
      <UsersSection onResetToFirstPage={handleResetToFirstPage} />
      <FormSection onUserRegistered={handleUserRegistered}/>
    </>
  );
};
