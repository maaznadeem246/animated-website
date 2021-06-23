import React, { useEffect, useState } from "react"
import styled from "styled-components"
import useAppData from "../hooks/useAppData"
import useWindowSize from "../hooks/useWindowSize"
import customVar from "../sass/customvariables.scss"

const WelcomDiv = styled.div`
    font-size:${props => props.fntsize};
    text-align:center;
    padding:10px 25px 10px 25px;
    border-radius:15px;
    font-family:${customVar.defaultAppNameFont};
    border:${props => props.border};
    background-color :${customVar.defaultBackColor};
`

function Welcome(){
    const {appName} = useAppData();
    const [width]= useWindowSize()
    const [isMobile, setIsMobile] = useState()

    useEffect(()=>{
        console.log(width)
        setIsMobile((width < 430))
    },[width])
    return(
        <WelcomDiv fntsize={isMobile ? '2.5rem': '5.5rem'} border={isMobile?`6px solid ${customVar.defaultColor}`: `10px solid ${customVar.defaultColor}`}>
            <div>{appName}</div>
        </WelcomDiv>
    )
}

export default Welcome;