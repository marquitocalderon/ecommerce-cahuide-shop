"use client"
import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
};

export default AppProvider;
