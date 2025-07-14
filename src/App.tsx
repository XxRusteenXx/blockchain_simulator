import { useState } from 'react';

import { StateContext } from './context/Context';
import { State } from './classes/State';
import Flow from './flow/Flow';

function App() {
  const [globalState, setGlobalState] = useState(new State());

  const rerender = () => {
    setGlobalState(globalState.clone());
  }

  return (
    <StateContext.Provider value={{state: globalState, rerender}}>
      <Flow/>
    </StateContext.Provider>
  );
}

export default App;
