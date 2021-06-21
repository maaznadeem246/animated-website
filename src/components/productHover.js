import React, { useEffect, useState } from "react"
import styled from "styled-components"
import useAppData from "../hooks/useAppData"


const HoverDiv = styled.div`
    height:60%;
    position: absolute;
    width:40%;
    margin:0;

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

    useEffect(()=> {
        setIndex(prdctAnimIndex)
        setProductData(productsData[prdctAnimIndex])
    },[prdctAnimIndex])


    useEffect(()=>{
        setHoverToggle(hoverIt)
    },[hoverIt])


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
        { hoverToggle && <>
        <HoverInnerDiv />
        <HoverDiv onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            { Object.keys(productData).length != 0 &&
                <>
                <div>{productData.text}</div>
                <div>{productData.textSec}</div>
                </>
            }
        </HoverDiv> </>}
        </>
    )
}

export default ProductHover