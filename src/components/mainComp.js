import React, { useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import Styled from "styled-components"
import ProductsSlider from "./productsSlider"
import BackCover from "./backCover"
import customVar from "../sass/customvariables.scss"
import useAppData from "../hooks/useAppData"

const BackDiv = Styled.div`
background-color:${props => props.brColor};
    height:100vh;
    :before{
        content:" ";
        position:absolute;
        top:12px;
        right:12px;
        left:12px;
        bottom:12px;
        background-color:${customVar.defaultBackColor};
    }
`
const styles = {
    mainD:{
        postition:"relative",
    }
}

function MainComp(){
    const {prdctAnimIndex} = useAppData()
    const [ind, setIndex] = useState(0)
    const [brColors] = useState(['white','#1f78f0ba','#fece2fba','#f04e23ba'])
    const stylesAnim = useSpring({
        config:{duration:700},
        delay:500,
        to:[
            { opacity: 1, transform:'scale(1,1)'},
            // { opacity: 1,},
          ],
        from: { opacity: 0, transform:'scale(0.6,0.6)'},
      })

      useEffect(()=>{
        setIndex(prdctAnimIndex)
      },[prdctAnimIndex])
      
    return (
        <animated.div   className={styles.mainD} style={stylesAnim}>  
                       
            <BackDiv brColor={brColors[ind] || brColors[1]}>
                <BackCover />
                </BackDiv>

            <ProductsSlider />
        </animated.div>
    )
}

export default MainComp;