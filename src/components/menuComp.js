import React, { useEffect, useState } from "react"
import { useChain, animated,useSpring,useSpringRef,useTransition } from "@react-spring/web";
import displayArrCursor from "./displayArrCursor"
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
    const hamApi = useSpringRef()
    const {ham} = useAppData();
    const [open, setOpen] = useState(false);
    
    

    useEffect(()=>{

        displayArrCursor(false)
        setOpen(ham)
    },[ham])

    const hamStyles = useSpring({  
        ref: hamApi,
        from:{opacity:0,scale:0.9,display:'none'},
        to: async (next, cancel) => {
            await next([{display:open ?'unset': 'block', opacity:open ? 0 : 1,scale:open ? 0.9 : 1},open ?{display:'none'}:{}])            
          },
        
    })

    // const transition = useTransition(open ? data : [], {
    //     ref: transApi,
    //     trail: 400 / data.length,
    //     from: { opacity: 0, scale: 0 },
    //     enter: { opacity: 1, scale: 1 },
    //     leave: { opacity: 0, scale: 0 },
    //   })

    useChain([hamApi])



    return (
        <>
        <animated.div style={{ ...hamStyles,...classes.mainDiv,}}>
            <animated.div>

            </animated.div>
        </animated.div>
        </>
    )
}

export default MenuComp;