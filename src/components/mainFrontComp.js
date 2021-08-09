import React, { useEffect, useState } from "react"
import { useSpring,animated } from "react-spring";
import styled from "styled-components";
import useAppData from "../hooks/useAppData";
import useWindowSize from "../hooks/useWindowSize";
const  colorVariables =  React.lazy(() => import("../sass/customvariables.scss")); 

const AppName = styled.h1`
        text-align:center;
        position:absolute;
        top:40px;
        left:55px;
        margin:0;
        word-spacing:0;
        line-height:35px;
`

const About  = styled.h1`
text-align:center;
position:absolute;
top:85px;
right:85px;
margin:0;
font-size:1.3rem;
transform: translateY(0) translateX(100%) rotate(90deg);
`

const Ham = styled.div`
position:absolute;
top:40px;
right:55px;
`

const HamMenu = styled.div`
position:relative;
height:5px;
width:25px;
border-radius:25%;
top:13px;
background-color:${colorVariables.defaultColor};
&::after{
    content:" ";
    position:absolute;
    height:5px;
    width:25px;
    border-radius:25%;
    background-color:${colorVariables.defaultColor};
    top:10px;
}

&::before{
    content:" ";
    position:absolute;
    height:5px;
    width:25px;
    border-radius:25%;
    background-color:${colorVariables.defaultColor};
    bottom:10px;
}

`

const Menu  = styled.h1`
text-align:center;
position:absolute;
bottom:50px;
right:60px;
margin:0;
font-size:2rem;
`

const AnimatedDivs = ({children,direction='default'}) => {

    const selDir = {
        up:'translateY(20px)',
        down:'translateY(-20px)',
        left:'translateX(20px)',
        right:'translateX(-20px)',
        default: 'translate(0)'
    }

    const animAppName = useSpring({
        config:{duration:600},
        delay:1000,
        to:{ opacity: 1, transform:'translate(0)'},
        from: { opacity: 0, transform:selDir[direction]},
      })
    return (
        <animated.div style={animAppName}>  
            {children}      
        </animated.div>
    )
}

function MainFrontComp(){
    const {appName} = useAppData();    
    const [width]= useWindowSize()
    const [isMobile, setIsMobile] = useState()

    useEffect(()=>{
        console.log(width)
        setIsMobile(width < 430)
    },[width])
    return (
        <>
       
        <AppName>
            <AnimatedDivs direction='up' >
                <div className="appNameCss" style={{ 'font-size':  isMobile ?'2rem':'2.5rem'}}>{appName}</div> 
            </AnimatedDivs>
        </AppName>



        {!isMobile ?<>
        <About>
            <AnimatedDivs direction='right' >
                ABOUT
            </AnimatedDivs>
        </About>
        <Menu>
            <AnimatedDivs direction='left' >
                MENU
            </AnimatedDivs>
        </Menu>
        </>:
            <Ham>
                <HamMenu />
            </Ham>

        }
        </>
    )
}

export default MainFrontComp;