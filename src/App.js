import React from 'react';
import './sass/index.scss';
import MainComp from "./components/mainComp"
import MainFrontComp from './components/mainFrontComp';
import {AppDataProvider} from "./contexts/appDataContext"


function App() {
  return (
    <div className="App">
      <AppDataProvider>
        <MainComp />
        <MainFrontComp />
      </AppDataProvider>
    </div>
  );
}

export default App;
