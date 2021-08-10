import React, {lazy, Suspense, useEffect} from 'react';
import './sass/index.scss';
// import MainComp from "./components/mainComp"
// import MainFrontComp from './components/mainFrontComp';
import {AppDataProvider} from "./contexts/appDataContext"
import Loading from './components/loading';
const  MenuComp =  React.lazy(() => import('./components/menuComp'));
const MainFrontComp =  React.lazy(() => import('./components/mainFrontComp'));
const MainComp =  React.lazy(() => import("./components/mainComp"));

const Comp = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve("dds"), 90000);
  });
})
function App() {
  
  return (
    <div className="App">
       <Suspense fallback={<Loading />}>
         {/* <Comp/> */}
      <AppDataProvider>
        <MainComp />
        <MenuComp />
        <MainFrontComp />
      </AppDataProvider>
      </Suspense>
    </div>
  );
}

export default App;
