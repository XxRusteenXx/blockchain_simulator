import { FC, useContext, useEffect, useRef } from "react";
import Header from "../components/ui/header/Header";
import Content from "../components/content/Content";
import { TIME_INTERVAL } from "../const/Const";
import { Loop } from "../classes/Loop";
import { StateContext } from "../context/Context";

const Flow: FC = () => {
  const {state, rerender} = useContext(StateContext);
  const hasStarted = useRef(false);

  useEffect(() => {
    // Needed to prevent double mount in strict mode
    if(hasStarted.current) return;
    hasStarted.current = true;

    setInterval(() => {
      Loop.Mine(
        state.getWallets(),
        state.getBlocksToBeMined(),
        state.removeBlockToBeMined,
        rerender
      );
      Loop.Broadcast(state.getWallets());
    }, TIME_INTERVAL)
  }, [])

  return (
    <>
      <Header/>
      <Content/>
    </>
  )
}

export default Flow