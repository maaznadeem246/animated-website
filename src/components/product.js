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

function Product({pim,style,displayArrCursor, bind=()=>{}}){

    const [width]= useWindowSize()
    const [isMobile, setIsMobile] = useState()
    useEffect(()=>{
        console.log(width)
        setIsMobile(width < 430)
    },[width])

    const styles = (isMobile) => {
        return {
            width: isMobile ? 'fit-content' : '200px', height : isMobile ? '40%' : '50%', 'cursor': 'pointer', userSelect:'none',
           
        }
    }

    return (
        <>
        {/* //    <animated.div  {...bind()}  className="containerDiv" style={{...style}}   >
        //        <StyledImg width={isMobile ? '130px' : '200px'} height={isMobile ? '40%' : '50%'} onMouseEnter={()=>displayArrCursor(false)}  src={pim}  />
        //     </animated.div> */}
        <animated.img   className={"containerDiv"} onMouseEnter={()=>displayArrCursor(false)} style={{...style, ...styles(isMobile)  }}   src={pim} />
        { isMobile && <animated.div  {...bind()} className={'containerDivWAft'} style={{...style, height : '40%',}} /> }
    </>
    )
}

export default Product;