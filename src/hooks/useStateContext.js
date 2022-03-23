import React from "react";
import { createContext, useState, useContext } from "react";

export const stateContext = createContext();

const getContext = () => {
  return {
    participandId: 0,
    timeTaken: 0,
    selectedOptions: [],
  };
};

export default function useStateContext() {
  const { context, setContext } = useContext(stateContext);
  return {
    context,
    setContext: (obj) => {
      setContext({ ...context, ...obj });
    },
  };
}

// eslint-disable-next-line react/prop-types
export function ContextProvider({ children }) {
  // const { children } = this.props;
  const [context, setContext] = useState(getContext());
  return (
    <stateContext.Provider value={{ context, setContext }}>
      {children}
    </stateContext.Provider>
  );
}
