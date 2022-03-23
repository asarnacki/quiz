import { useContext } from "react";
import useStateContext, { stateContext } from "../hooks/useStateContext";

function Question() {
  
  const { context, setContext } = useStateContext();

  return <div></div>;
}

export default Question;
