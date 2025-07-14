import { createContext } from "react";
import { State } from "../classes/State";

interface IContext {
  state: State
  rerender: () => void
}

export const StateContext = createContext<IContext>({
  state: new State(),
  rerender: () => {}, //placeholder function
});