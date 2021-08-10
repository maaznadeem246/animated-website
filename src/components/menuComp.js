import React, { useEffect, useState } from "react"
import { animated,useSpring } from "react-spring";
import useAppData from "../hooks/useAppData";
import colorVariables from "../sass/customvariables.scss"


const styles = () => ({
    mainDiv:{
        position:'absolute',              
        top:0,
        right:0,
        left:0,
        bottom:0,
        height:'100vh',
        background:colorVariables.defaultBackColor,
        '&::after':{

        
        }
    }
})

function MenuComp(){
    const classes = styles();
    const [hamStyles, hamApi] = useSpring(() => ({from:{opacity:0,scale:0.9,display:'none'}}))
    const {ham} = useAppData();
    
    // const [hide, setHide] = useState(true);

    useEffect(()=>{
        // setHide(ham)

        hamApi.start({to:[{display:ham ?'unset': 'block', opacity:ham ? 0 : 1,scale:ham ? 0.9 : 1},ham ?{display:'none'}:{}]})
    },[ham])

    return (
        <>
        <animated.div style={{ ...hamStyles,...classes.mainDiv,}}>
        </animated.div>
        </>
    )
}

export default MenuComp;