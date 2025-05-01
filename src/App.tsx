import { useState } from 'react';

import Content from './components/content/Content';
import Header from './components/ui/header/Header';
import { StateContext } from './context/Context';
import { State } from './classes/State';

function App() {
  const [globalState, setGlobalState] = useState(new State());

  return (
    <StateContext.Provider value={{state: globalState, setState: setGlobalState}}>
      <Header/>
      <Content/>
    </StateContext.Provider>
  );
}

export default App;
