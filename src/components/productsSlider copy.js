import React, { useState, useCallback,  useEffect, useRef } from 'react'
import { useTransition, config, animated, useSpringRef } from '@react-spring/web'
import styled from 'styled-components'
import Product from './product'
import Welcome from './welcomComp'
import useAppData from '../hooks/useAppData'
import useWindowSize from '../hooks/useWindowSize'
import displayArrCursor from "./displayArrCursor"
import {imgCache} from "../utilities/imageCache"
import ProductHover from './productHover'
import { useGesture } from 'react-use-gesture'

const MainDiv = styled.div`

display: flex;
align-items: center;


justify-content: center;
top: 0;
position: absolute;
right: 0;
left: 0;
bottom: 0;
height: 100vh;
user-select:none;
scroll-behavior: unset;
`





const pr = [
  ({style,displayArrCursor}) =>  <animated.div className="containerDiv"  style={{'userSelect':'none' ,...style}}  ><div onMouseEnter={(e)=> { displayArrCursor(false)}} onMouseLeave={(e)=> { displayArrCursor(true)}}> <Welcome /></div></animated.div>  ,
  ({style,data,displayArrCursor}) =>  <Product displayArrCursor={displayArrCursor} pim={data.img} style={{'userSelect':'none' ,...style}} />,
  ({style,data,displayArrCursor}) =>  <Product displayArrCursor={displayArrCursor} pim={data.img} style={{'userSelect':'none' ,...style}} />,
  ({style,data,displayArrCursor}) =>  <Product displayArrCursor={displayArrCursor} pim={data.img} style={{'userSelect':'none' ,...style}} />,
  
]


function ProductsSlider(){
  const {productsData,prdctAnimIndex, updatePrdctAnimIndex } = useAppData()
  const [gone] = useState(() => new Set())
    // const productImages = [
    //   'welcome',
    //   Can1,Can2,Can3
    // ]
    const [index, setIndex] = useState(0)
    const [width] = useWindowSize();
    const [scrWidth, setScrWidth] = useState(0)
    const [hoverIt, setHoverIt] = useState(false)
    const [isMobile, setIsMobile] = useState()


    const [productImages, setProductImages] = useState(productsData)
    // let neA = [...productImages];
    // neA.splice(1,neA.length-1).forEach((img) => imgCache.read(img));
    // const onClick = useCallback(() => setIndex(state => (state + 1) % productImages.length), [])
    const transRef = useSpringRef()
    const [ts, setTs] = useState(true)
    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        unique: true,
        reverse:true,

        config: config.gentle,
        from: { opacity: 0, transform: `translate3d(${ts?'':'-'}100%,0,0)` },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: `translate3d(${ts?'-':''}100%,0,0)` },
 
      })


      const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        // transRef.start({
        //   to:{transform()}
        // })
       // if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        // set(i => {
        //   if (index !== i) return // We're only interested in changing spring-data for the current spring
        //   const isGone = gone.has(index)
        //   const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
        //   const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
        //   const scale = down ? 1.1 : 1 // Active cards lift up a bit
        //   return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        // })
        // if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || set(i => to(i)), 600)
      })
       
      useEffect(()=>{
        console.log(width)
        setIsMobile((width < 430))
    },[width])

      useEffect(() => {
        transRef.start()
        updatePrdctAnimIndex(index)      

      }, [index])

      const chnL = () => { 
        setTs(false);
        setIndex((prev) => prev == 0 ?  productImages.length -1 : prev- 1)
      }

      const chnR = () => { 
        setTs(true);
        setIndex((prev) => productImages.length -1 ==  prev ?  0  : prev + 1)

      }

      const onClick = useCallback( (e) => {
        console.log(e.clientX)
        if(width / 2 < e.clientX ){
          chnR()
        }else{
          chnL()
        }
        hideHoverDiv();
      })

      useEffect(()=>{
        console.log(width)
        setScrWidth(width)
      },[width])


      const cursorDivfunct = (v) => {
        displayArrCursor(v)
        showHoverDiv()
      } 

      const hideHoverDiv = () => {
        // if(index == 0  
        displayArrCursor(true); 
        setHoverIt(false)
      }

      const showHoverDiv = () => {
        displayArrCursor(false)
        setHoverIt(true)
      }
    
    return (
      <>
        {/* <button onClick={chnL} >left</button>

        <button onClick={chnR}>right</button> */}
        <MainDiv className='container' onClick={onClick}>

            { transitions((style, i) => {
              console.log(style)
                const Page = productImages[i];
                const PrPage = pr[i];

                console.log(Page)
                return( 
                  <>
                  {/* {Page == 'welcome' ? 
                : */}
                <PrPage displayArrCursor={cursorDivfunct} style={style} data={Page} />
                
            {/* } */}
                </>
                )
            })}
            { !isMobile &&
              <ProductHover displayArrCursor={displayArrCursor} hideHoverDiv={hideHoverDiv} hoverIt={hoverIt} />
            }
        </MainDiv>

   </>
    )
}

export default ProductsSlider;