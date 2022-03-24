import React, { useEffect } from "react";
import { createContext, useState, useContext } from "react";

export const stateContext = createContext();

const getContext = () => {
  if (localStorage.getItem("context") === null) {
    localStorage.setItem(
      "context",
      JSON.stringify({
        participandID: 0,
        timeTaken: 0,
        selectedOptions: [],
      })
    );
  }
  return JSON.parse(localStorage.getItem("context"));
};

export default function useStateContext() {
  const { context, setContext } = useContext(stateContext);

  useEffect(() => {
    localStorage.setItem("context", JSON.stringify(context));
  }, [context]);
  return {
    context,
    setContext: (obj) => {
      setContext({ ...context, ...obj });
    },
    resetContext: () => {
      localStorage.removeItem("context");
      setContext(getContext());
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
