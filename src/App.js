import React, {Suspense} from 'react';
import './sass/index.scss';
import MainComp from "./components/mainComp"
import MainFrontComp from './components/mainFrontComp';
import {AppDataProvider} from "./contexts/appDataContext"


function App() {
  return (
    <div className="App">
       <Suspense fallback={<div>Loading</div>}>
      <AppDataProvider>
        <MainComp />
        <MainFrontComp />
      </AppDataProvider>
      </Suspense>
    </div>
  );
}

export default App;
