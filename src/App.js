import React, {lazy, Suspense, useEffect, useState} from 'react';
import './sass/index.scss';
// import MainComp from "./components/mainComp"
// import MainFrontComp from './components/mainFrontComp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {AppDataProvider} from "./contexts/appDataContext"
import Loading from './components/loading';
import useWindowSize from './hooks/useWindowSize';
const  MenuComp =  React.lazy(() => import('./components/menuComp'));
const MainFrontComp =  React.lazy(() => import('./components/mainFrontComp'));
const MainComp =  React.lazy(() => import("./components/mainComp"));
const ProductComp =  React.lazy(() => import("./components/productComp"));

const Comp = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve("dds"), 90000);
  });
})
function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [width] = useWindowSize();
  useEffect(()=>{
      console.log(width)
      setIsMobile((width < 770))
  },[width])  
  return (
    <div className="App">
        <div className="cursor" style={{display:!isMobile?'block':'none'}} ></div>
       <Suspense fallback={<Loading />}>
         {/* <Comp/> */}
      <AppDataProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={MainComp} />
            {/* <Route path="/:prdId" component={ProductComp} /> */}
          </Switch>
        </Router>
        {/* <MainComp /> */}
        <MenuComp />
        <MainFrontComp />
      </AppDataProvider>
      </Suspense>
    </div>
  );
}

export default App;
