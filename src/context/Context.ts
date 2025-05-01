import { createContext } from "react";
import { State } from "../classes/State";

interface IContext {
  state: State
  setState: (arg: any) => any
}

export const StateContext = createContext<IContext>({
  state: new State(),
  setState: () => null, //placeholder function
});