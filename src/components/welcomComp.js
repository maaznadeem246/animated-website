import React from "react"
import styled from "styled-components"


const WelcomDiv = styled.div`
    font-size:3rem;
    text-align:center;
`

function Welcome(){
    return(
        <WelcomDiv>
            <div>Welcome</div>
            <div>to Prop Drop</div>
        </WelcomDiv>
    )
}

export default Welcome;