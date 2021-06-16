import React from 'react';
import './sass/index.scss';
import MainComp from "./components/mainComp"
import MainFrontComp from './components/mainFrontComp';


function App() {
  return (
    <div className="App">
      <MainComp >
        <MainFrontComp />
      </MainComp>
      
    </div>
  );
}

export default App;
