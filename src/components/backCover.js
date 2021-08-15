import React, { useState, useCallback,  useEffect, useRef, useLayoutEffect }  from "react"
import { useTransition, config, animated, useSpringRef, useSpring } from '@react-spring/web'
import useAppData from "../hooks/useAppData"
import styled from "styled-components"
import {imgCache} from "../utilities/imageCache"
import useWindowSize from "../hooks/useWindowSize"

const CoverDiv = styled.div`
display: flex;
align-items: center;
height: 100%;
overflow:hidden;
justify-content: center;
position:relative;
`




const pr = [
  ({style ,src}) =>  {
    // imgCache.read(src)
  return <animated.img  src={src} className={'bg'} style={{'userSelect':'none' ,...style}}  />}  ,
  ({style,src}) => {
    // imgCache.read(src)
    return  <animated.img  src={src} className={'bg'} style={{'userSelect':'none' ,...style}}  />},
  ({style,src}) => {
    // imgCache.read(src)
    return <animated.img  src={src} className={'bg'} style={{'userSelect':'none' ,...style}}  />},
  ({style,src}) => {
    // imgCache.read(src)
    return <animated.img  src={src} className={'bg'} style={{'userSelect':'none' ,...style}}  />},      
]





function BackCover(){
    const {productsBackData,prdctAnimIndex} = useAppData()
  
    const [productBack, setProductBack] = useState(productsBackData)
    productBack.forEach((img) => imgCache.read(img));
    const [index, setIndex] = useState(0)
    const [as, setAs] = useState(true)
    const [width]= useWindowSize()
    const [isMobile, setIsMobile] = useState()


    // const onClick = useCallback(() => setIndex(state => (state + 1) % productBack.length), [])
    const transRef = useSpringRef()


    const transitions = useTransition(index, {
      ref: transRef,
      keys: null,

      from: { opacity: 0.1,}, // transform:'scale(1.5)'
      enter: { opacity: 1,  },  //transform:'scale(1)'
      leave: { opacity: 0.1, }, // transform:'scale(0.5)'  
      config: { duration: 600, ...config.slow },
    })

    
    useEffect(()=>{
      console.log(width)
      setIsMobile(width < 770)
  },[width])

      // useEffect(() => {
      //   updatePrdctAnimIndex(index)
      //   //console.log(transRef)
      //   console.log()
      
        
      // //  console.log(index)
      // }, [index])
      useEffect(() => {
 

        // console.log(prdctAnimIndex)
        setIndex(prdctAnimIndex)
        
      },[prdctAnimIndex])

      useEffect(()=>{
        transRef.start()
      },[index])



      // const ch = (e) => {
      //   e.stopPropagation()
      //   api({
      //     opacity: 0,
      //   })
      // }




    return(
        <CoverDiv >
          { transitions((style, i) => {
            const Page = productBack[i]
            const PrPage = pr[i]
            return( 
            <>
              <PrPage style={{'object-fit':'cover', width: isMobile ? '100%': '40%', height: isMobile ? '30%': '100%',position:'absolute',...style}} src={Page} />
            </>
            )
          })}

        </CoverDiv>
    )
}


export default BackCover;