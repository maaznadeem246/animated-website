import React from "react"
import { useSpring, animated } from "react-spring"
import Styled from "styled-components"
import ProductsSlider from "./productsSlider"

const BackDiv = Styled.div`
background-color:white;
    height:100vh;
    :before{
        content:" ";
        position:absolute;
        top:12px;
        right:12px;
        left:12px;
        bottom:12px;

        background-color:#00ff0314;
    }
`
const styles = {
    mainD:{
        postition:"relative",
    }
}

function MainComp({children}){

    const stylesAnim = useSpring({
        config:{duration:700},
        delay:500,
        to:[
            { opacity: 0.6, transform:'scale(1,1)'},
            { opacity: 1,},
          ],
        from: { opacity: 0, transform:'scale(0.6,0.6)'},
      })
      
    return (
        <animated.div  className={styles.mainD} style={stylesAnim}>  
                       
            <BackDiv>
                {children}
            </BackDiv>  
            <ProductsSlider />
        </animated.div>
    )
}

export default MainComp;