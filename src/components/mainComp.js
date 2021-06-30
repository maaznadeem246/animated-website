import React, { useEffect, useLayoutEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import Styled from "styled-components"
import ProductsSlider from "./productsSlider"
import BackCover from "./backCover"
import customVar from "../sass/customvariables.scss"
import useAppData from "../hooks/useAppData"
import useWindowSize from "../hooks/useWindowSize"

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
    const [width] = useWindowSize();
    const [ind, setIndex] = useState(0)
    const [scrWidth, setScrWidth] = useState(0)
    const [brColors] = useState(['white','#1f78f0ba','#fece2fba','#f04e23ba'])
       const [isMobile, setIsMobile] = useState()

    useEffect(()=>{
        console.log(width)
        setIsMobile((width < 430))
    },[width])
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

      useLayoutEffect(()=>{
          
        let cursor = document.querySelector(".cursor");
        console.log(cursor.style.width)
        if(!isMobile){
        window.addEventListener("mousemove", animation);
        function animation (e){
           
            cursor.style.top = e.pageY + "px";
            cursor.style.left = e.pageX + "px";
            if(scrWidth / 2 < e.pageX ){
                cursor.style.transform = 'rotateY(3.142rad)'
                cursor.style.marginLeft = '-45px'
            }else{
                cursor.style.transform = 'rotateY(0)'
                cursor.style.marginLeft = '0px'
            }

          };

        window.addEventListener("mouseleave",onLeave);
          function onLeave(e){
            cursor.style.display = "block";
        }


        window.addEventListener("mouseenter",onEnter);
        function onEnter(e){
            cursor.style.display = 'none';
        }
      }
      },[scrWidth])


      useEffect(()=>{
        console.log(width)
        setScrWidth(width)
      },[width])
      
    return (
        <>
        <div className="cursor" style={{display:!isMobile?'block':'none'}} ></div>
        <animated.div   className={styles.mainD} style={stylesAnim}>  
                       
            <BackDiv brColor={brColors[ind] || brColors[1]}>
                <BackCover />
                </BackDiv>

            <ProductsSlider />
        </animated.div>
        </>
    )
}

export default MainComp;