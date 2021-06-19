import React, { useState, useCallback,  useEffect, useRef } from 'react'
import { useTransition, config, animated, useSpringRef } from '@react-spring/web'
import styled from 'styled-components'
import Product from './product'
import Welcome from './welcomComp'
import useAppData from '../hooks/useAppData'

const MainDiv = styled.div`

display: flex;
align-items: center;

height: 100%;

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




function ProductsSlider(){
  const {productsData,prdctAnimIndex, updatePrdctAnimIndex } = useAppData()
  
    // const productImages = [
    //   'welcome',
    //   Can1,Can2,Can3
    // ]
    const [index, setIndex] = useState(0)
    const [productImages, setProductImages] = useState(productsData)
    const onClick = useCallback(() => setIndex(state => (state + 1) % productImages.length), [])
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


      // useEffect(() => {
      //   console.log(productsData)
      //   console.log(index)
      //   setProductImages(productsData)
      // },[productsData.length])

      useEffect(() => {

        //console.log(transRef)

        transRef.start()
        updatePrdctAnimIndex(index)      
        
      //  console.log(index)
      }, [index])

      const changeAnimDir = (e) => {
        e.stopPropagation();         
        //  let newAr = [...productImages]
        // // setProductImages([productImages[0],...newAr.reverse()]);'
        // let indexVal = index;
        // let getSlicedValueAfter = newAr.slice(indexVal,newAr.length)
        // let getSlicedValueBefore = newAr.slice(0,indexVal)
        // console.log(getSlicedValueAfter)
        // console.log(getSlicedValueBefore)
        // let alteredArr = !ts ?  [,...getSlicedValueAfter.reverse(),...getSlicedValueBefore] : [...getSlicedValueAfter,...getSlicedValueBefore]
        // setProductImages(alteredArr);
        setTs((prev)=>!prev);
          // console.log(transRef.)
          setIndex((prev) => prev == 0 ?  productImages.length -1 : prev- 1)

      }

      const chnL = () => { 
        setTs(false);
        // console.log(transRef.)
        setIndex((prev) => prev == 0 ?  productImages.length -1 : prev- 1)

      }

      const chnR = () => { 
        setTs(true);
        setIndex((prev) => productImages.length -1 ==  prev ?  0  : prev + 1)

      }

      const pr = [
        ({style}) =>  <animated.div  style={{'userSelect':'none' ,...style}}  ><div onClick={(e)=> { changeAnimDir(e)}}> <Welcome /></div></animated.div>  ,
        ({style,src}) =>  <Product changeAnimDir={changeAnimDir} pim={src} style={{'userSelect':'none' ,...style}} />,
        ({style,src}) =>  <Product changeAnimDir={changeAnimDir} pim={src} style={{'userSelect':'none' ,...style}} />,
        ({style,src}) =>  <Product changeAnimDir={changeAnimDir} pim={src} style={{'userSelect':'none' ,...style}} />,
        
      ]
    
    return (
      <>
        {/* <button onClick={chnL} >left</button>

        <button onClick={chnR}>right</button> */}
        <MainDiv className='container' onClick={onClick}>

            { transitions((style, i) => {
              console.log(style)
                const Page = productImages[i]
                const PrPage = pr[i]

                console.log(Page)
                return( 
                  <>
                  {/* {Page == 'welcome' ? 
                : */}
                <PrPage style={style} src={Page} />
                
            {/* } */}
                </>
                )
            })}
        </MainDiv>
   </>
    )
}

export default ProductsSlider;