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

function Product({pim,style,changeAnimDir}){
    
    return (
           <animated.div  style={{'user-select':'none' ,...style}}  >
               <StyledImg src={pim} onClick={(e)=> { changeAnimDir(e)}}  />
            </animated.div>
    )
}

export default Product;