import React from "react"
import Styled from "styled-components"


const BackDiv = Styled.div`
    background-color:#00ff0314;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border:12px solid white;
`

function MainComp({children}){
    return (
        <BackDiv>
            {children}
        </BackDiv>
    )
}

export default MainComp;