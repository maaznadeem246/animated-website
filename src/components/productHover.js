import React, { useEffect, useState } from "react"
import styled from "styled-components"
import useAppData from "../hooks/useAppData"
import { useTransition, config, animated, useSpringRef, useSpring } from '@react-spring/web'


const HoverDiv = styled.div`
    height:60%;
    position: absolute;
    width:40%;
    margin:0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
`

const HoverInnerDiv = styled.div`
height:100%;
position: absolute;
width:40%;
margin:0;
background-color:#f9f4eacc;

`

function ProductHover({hoverIt, hideHoverDiv, displayArrCursor}){

    const {prdctAnimIndex,productsData} = useAppData()
    const [index, setIndex] = useState();
    const [productData, setProductData] = useState({})
    const [hoverToggle, setHoverToggle] = useState(false)
    
    const [innerSyle,innerApi] = useSpring(() => ({
     //   from:[{opacity: 1},{display:'none'}] 

    }))

    useEffect(()=> {
        setIndex(prdctAnimIndex)
        setProductData(productsData[prdctAnimIndex])
    },[prdctAnimIndex])


    useEffect(()=>{
        setHoverToggle(hoverIt)
        // // console.log(hoverIt)
        if(hoverIt){
            innerApi.start({to:[{display:'block'},{opacity:1 }]})
        }else{
            innerApi.start({to:[{opacity:0 },{display:'none'}]})
        }

    },[hoverIt])

    useEffect(()=> {

    },[])

    const onLeave = () => {
        hideHoverDiv()
    }

    const onEnter = () => {

    }

    const onClick  = (e) => {
        if(index != 0)  e.stopPropagation();

    }
    return(
        <>
                <animated.div className="hoverInnerDiv" style={{...innerSyle}} />
        { hoverToggle && <>
            {/* <HoverInnerDiv /> */}
        <HoverDiv  onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            { Object.keys(productData).length != 0 &&
                <>
                <div className="hoverDivHead">{productData.text}</div>
                <div>{productData.textSec}</div>
                </>
            }
        </HoverDiv> </>}
        </>
    )
}

export default ProductHover