import React, { useEffect, useState } from 'react'
import { useTransition, animated, useSpringRef } from '@react-spring/web'
import styled from 'styled-components'
import useWindowSize from '../hooks/useWindowSize'

const StyledImg = styled.img`
    height:${props => props.height};
    width:${props => props.width};
    cursor: pointer;
    user-select:none;
    position:relative;
    
`

function Product({pim,style,displayArrCursor}){
    
    const [width]= useWindowSize()
    const [isMobile, setIsMobile] = useState()
    useEffect(()=>{
        console.log(width)
        setIsMobile(width < 430)
    },[width])

    return (
           <animated.div  className="containerDiv" style={{'user-select':'none' ,...style}}  >
               <StyledImg width={isMobile ? '130px' : '200px'} height={isMobile ? '40%' : '50%'} onMouseEnter={()=>displayArrCursor(false)}  src={pim}  />
            </animated.div>
    )
}

export default Product;