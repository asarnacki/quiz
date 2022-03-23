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
    setContext: obj => {
      setContext({ ...context, ...obj });
    },
  };
}

export function ContextProvider({ children }) {
  const [context, setContext] = useState(getContext());
  return (
    <stateContext.Provider value={{context, setContext}}>
      {children}
    </stateContext.Provider>
  );
}
