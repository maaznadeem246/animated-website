import React, { useState, useCallback,  useEffect, useRef } from 'react'
import { useTransition, animated, useSpringRef } from '@react-spring/web'
import styled from 'styled-components'


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


const pages = [
  ({ style }) => <animated.div style={{ ...style, }}>A</animated.div>,
  ({ style }) => <animated.div style={{ ...style, }}>B</animated.div>,
  ({ style }) => <animated.div style={{ ...style, }}>C</animated.div>,
]

function ProductsSlider(){

    const [index, setIndex] = useState(0)
    const onClick = useCallback(() => setIndex(state => (state + 1) % 3), [])
    const transRef = useSpringRef()
    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
      })

      useEffect(() => {
        transRef.start()
        console.log(index)
      }, [index])
    
    return (
        <MainDiv className='container' onClick={onClick}>
            {transitions((style, i) => {
                const Page = pages[i]
                return <Page  style={{'user-select':'none','scroll-behavior': 'unset' ,...style}} />
            })}

        </MainDiv>
    )
}

export default ProductsSlider;