import React, { useState, useCallback,  useEffect, useRef } from 'react'
import { useTransition, config, animated, useSpringRef, useSprings } from '@react-spring/web'
import styled from 'styled-components'
import Product from './product'
import Welcome from './welcomComp'
import useAppData from '../hooks/useAppData'
import useWindowSize from '../hooks/useWindowSize'
import displayArrCursor from "./displayArrCursor"
import {imgCache} from "../utilities/imageCache"
import ProductHover from './productHover'
import { useGesture } from 'react-use-gesture'
import { clamp } from 'lodash-es'

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

scroll-behavior: unset;
`





const pr = [
  ({style,displayArrCursor, bind}) =>  <animated.div className="containerDiv" {...bind()}  style={{'userSelect':'none', 'touch-action':'none' ,...style}}  ><div onMouseEnter={(e)=> { displayArrCursor(false); console.log('fd')}} onMouseLeave={(e)=> { displayArrCursor(true)}}> <Welcome /></div></animated.div>  ,
  ({style,data,displayArrCursor, bind}) =>  <Product bind={bind} displayArrCursor={displayArrCursor} pim={data.img} style={{'userSelect':'none', 'touch-action':'none' ,...style}} />,
  ({style,data,displayArrCursor, bind}) =>  <Product bind={bind} displayArrCursor={displayArrCursor} pim={data.img} style={{'userSelect':'none', 'touch-action':'none' ,...style}} />,
  ({style,data,displayArrCursor, bind}) =>  <Product bind={bind} displayArrCursor={displayArrCursor} pim={data.img} style={{'userSelect':'none', 'touch-action':'none' ,...style}} />,
  
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
    const [scrWidth, setScrWidth] = useState(width)
    const [hoverIt, setHoverIt] = useState(false)
    const [isMobile, setIsMobile] = useState(false)


    const [productImages, setProductImages] = useState(productsData)
    // let neA = [...productImages];
    // neA.splice(1,neA.length-1).forEach((img) => imgCache.read(img));
    // const onClick = useCallback(() => setIndex(state => (state + 1) % productImages.length), [])
    const transRef = useSpringRef()
    const [ts, setTs] = useState(true)


    const [props, set] = useSprings(productImages.length, (i) => ({ x: (i < productImages.length - 1 ? i : -1) * window.innerWidth }))

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


      const bind = useGesture({
        onDrag: ({ down, active, distance,direction: [xDir], cancel,  movement: [mx],  offset: [x] }) => {
          if(isMobile){
            console.log('mo')
          if (active && distance > window.innerWidth / 2){
            cancel((setIndex(clamp(index + (xDir > 0 ? -1 : 1), 0, productImages.length - 1))))
          }
          set.start((i) => {
            if (i < index - 1 || i > index + 1) return { display: 'none' }
            const xx =(i - index) * window.innerWidth + (active ? mx : 0)
            return ({ x: xx})
          })
        }
        
        },

      })
      
       
      useEffect(()=>{
        console.log(width)
        setIsMobile((width < 430))
    },[width])

      useEffect(() => {
        set.start((i) => {
          const xx =(i - index) * window.innerWidth 
          return ({ x: xx})
        })
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
        if(!isMobile){
          if(width / 2 < e.clientX ){
            chnR()
          }else{
            chnL()
          }
          hideHoverDiv();
        }
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

        <button onClick={chnR}>right</button>  */}
        <MainDiv className='container' onClick={onClick}>

            { props.map(({x}, i) => {
            
                const Page = productImages[i];
                const PrPage = pr[i];

                console.log(Page)
                return( 
                  <>
                  {/* {Page == 'welcome' ? 
                : */}
                <PrPage displayArrCursor={cursorDivfunct} bind={bind}   style={{width:isMobile?'100%':'fit-content',x}} data={Page} />
                
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