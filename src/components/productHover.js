import React, { useEffect, useState } from "react"
import styled from "styled-components"
import useAppData from "../hooks/useAppData"
import { useTransition, config, animated, useSpringRef, useSpring } from '@react-spring/web'
import useWindowSize from "../hooks/useWindowSize"


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
background-color:#f9f4eaa6;
`

const TextDiv = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items:center;
`

function ProductHover({hoverIt, hideHoverDiv, displayArrCursor}){
    const [width] = useWindowSize();
    const {prdctAnimIndex,productsData} = useAppData()
    const [isMobile, setIsMobile] = useState(false)
    const [index, setIndex] = useState();
    const [productData, setProductData] = useState({})
    const [hoverToggle, setHoverToggle] = useState(false)
    const [fntColors] = useState(['inherit','#1f78f0ba','#fece2f','#f04e23ba'])
    const [innerSyle,innerApi] = useSpring(() => ({display:'none'}))
    const [innerDStyle,innerDApi] = useSpring(() => ({display:'none'}))
    const [innerHeadStyle,innerHeadApi] = useSpring(() => ({
        opacity:0,
        transform:'translate3d(-8%,0,0)'
    }))

    const [mobileText,mobileTextApi] = useSpring(() => ({
        opacity:0,
        transform:'translate3d(-8%,0,0)',
        // delay:3000,
        // config:{duration:2000}
        
      }))


    useEffect(()=>{
        console.log(width)
        setIsMobile((width < 430))
    },[width])

    useEffect(()=> {
        mobileTextApi.start({opacity:0,   transform:'translate3d(-8%,0,0)'})
        setIndex(prdctAnimIndex)
        setProductData(productsData[prdctAnimIndex])
        mobileTextApi.start({ opacity:1,   transform:'translate3d(0%,0,0)'})
    },[prdctAnimIndex])




    useEffect(()=>{
        setHoverToggle(hoverIt)
        console.log(hoverIt)

        if(hoverIt){
            console.log('hoverIt')
            innerApi.start({to:[{display:'block'},{opacity:1 }]})
            innerDApi.start({display:'flex'})
            innerHeadApi.start({
                opacity:1,
                transform:'translate3d(0%,0,0)'
            })
        }else{
            innerHeadApi.start({
                opacity:0,
                transform:'translate3d(-8%,0,0)',
            })
            innerDApi.start({delay:150,display:'none'})
            innerApi.start({to:[{opacity:0 },{display:'none'}]})
            
           
        }

    },[hoverIt])

    useEffect(()=> {
//       mobileTextApi.start({ delay:2000,opacity:1,  transform:'translate3d(0%,0,0)'})
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
        { !isMobile ?
        <>
        <animated.div className="hoverInnerDiv" style={{...innerSyle}} />
        <animated.div  className="hoverDiv" style={{...innerDStyle, }} onClick={onClick} onMouseLeave={onLeave}>
            { productData && Object.keys(productData).length != 0 &&
                <>
                    <animated.div className="hoverDivHead" style={{...innerHeadStyle, color:fntColors[index]}}>{productData.text}</animated.div>
                    <animated.div className="hoverDivHeadSub" style={{...innerHeadStyle, color:fntColors[index]}} >{productData.textSec}</animated.div>
                </>
            }
        </animated.div>

        </>:
            <TextDiv>
                { productData && Object.keys(productData).length != 0 &&
                     <>
                     <animated.div className="prdctText" style={{...mobileText, color:fntColors[index]}}>{productData.text}</animated.div>
                     <animated.div className="prdctTextSub" style={{...mobileText, color:fntColors[index]}} >{productData.textSec}</animated.div>
                    </> 
                }
            </TextDiv>
        }
        </>
    )
}

export default ProductHover