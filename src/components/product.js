import React, { useState } from 'react'
import { useTransition, animated, useSpringRef } from '@react-spring/web'
import styled from 'styled-components'

const StyledImg = styled.img`
    height:50%;
    width:200px;
    cursor: pointer;
    user-select:none;
    position:relative;
    
`

function Product({pim,style,displayArrCursor}){
    
    return (
           <animated.div  className="containerDiv" style={{'user-select':'none' ,...style}}  >
               <StyledImg onMouseEnter={()=>displayArrCursor(false)}  src={pim}  />
            </animated.div>
    )
}

export default Product;