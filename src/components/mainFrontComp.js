import React from "react"
import styled from "styled-components";


const AppName = styled.h1`
        text-align:center;
        position:fixed;
        top:40px;
        left:55px;
        margin:0;
        word-spacing:0;
        line-height:35px;
`

const About  = styled.h1`
text-align:center;
position:fixed;
top:100px;
right:100px;
margin:0;
font-size:1.5rem;
transform: translateY(0) translateX(100%) rotate(90deg);
`

const Menu  = styled.h1`
text-align:center;
position:fixed;
bottom:60px;
right:65px;
margin:0;
font-size:2rem;
`

function MainFrontComp(){
    return (
        <>
        <AppName>
            <div>ProD</div> 
            <div>DroP</div>
        </AppName>
        <About>
            About
        </About>
        <Menu>
            Menu
        </Menu>
        </>
    )
}

export default MainFrontComp;