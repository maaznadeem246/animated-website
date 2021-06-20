import React, { useState, useCallback,  useEffect, useRef, useLayoutEffect }  from "react"
import { useTransition, config, animated, useSpringRef, useSpring } from '@react-spring/web'
import useAppData from "../hooks/useAppData"
import styled from "styled-components"

const CoverDiv = styled.div`
display: flex;
align-items: center;
height: 100%;
overflow:hidden;
justify-content: center;
position:relative;
`

const pr = [
  ({style ,src}) =>  <animated.img  src={src} className={'bg'} style={{'userSelect':'none' ,...style}}  />  ,
  ({style,src}) =>  <animated.img  src={src} className={'bg'} style={{'userSelect':'none' ,...style}}  />,
  ({style,src}) =>  <animated.img  src={src} className={'bg'} style={{'userSelect':'none' ,...style}}  />,
  ({style,src}) => <animated.img  src={src} className={'bg'} style={{'userSelect':'none' ,...style}}  />,      
]





function BackCover(){
    const {productsBackData,prdctAnimIndex} = useAppData()
  
    const [productBack, setProductBack] = useState(productsBackData)
    const [index, setIndex] = useState(0)
    const [as, setAs] = useState(true)
    // const onClick = useCallback(() => setIndex(state => (state + 1) % productBack.length), [])
    const transRef = useSpringRef()


    const transitions = useTransition(index, {
      ref: transRef,
      keys: null,

      from: { opacity: 0, transform:'scale(1.5)'}, //transform:'scale(0.5)'
      enter: { opacity: 1, transform:'scale(1)' }, 
      leave: { opacity: 0, transform:'scale(0.5)' },  
      config: { duration: 600 },
    })

    
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
              console.log(style)
                const Page = productBack[i]
                const PrPage = pr[i]
                return( 
                  <>
                  {/* {Page == 'welcome' ? 
                : */}
                <PrPage style={{'object-fit':'cover', width:'40%',...style}} src={Page} />
                
            {/* } */}
                </>
                )
            })}

        </CoverDiv>
    )
}


export default BackCover;