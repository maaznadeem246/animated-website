import React from "react"
import styled from "styled-components"
import useAppData from "../hooks/useAppData"
import customVar from "../sass/customvariables.scss"

const WelcomDiv = styled.div`
    font-size:2.5rem;
    text-align:center;
    padding:10px 25px 10px 25px;
    border-radius:15px;
    font-weight:600;
    border:10px solid ${customVar.defaultColor};
    background-color :${customVar.defaultBackColor};
`

function Welcome(){
    const {appName} = useAppData();
    return(
        <WelcomDiv>
            <div>Welcome</div>
            <div>to {appName}</div>
        </WelcomDiv>
    )
}

export default Welcome;