import React, { useEffect, useState } from "react"
import { useChain, animated,useSpring,useSpringRef,useTransition,useTrail } from "@react-spring/web";
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


function RevealCan({ open, children,ref }){
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length,{ 
        ref:ref,
        opacity: open ? 0 : 1,
        height: open ? 0 : 300,
        from:{opacity:0,height:0,}
    })
    return(
        <>{
        trail.map((style,index)=>(
        <animated.div key={index} style={{...style, background:'white',flexGrow:1, margin:10,borderRadius:20}}>

        </animated.div>
        ))}</>
    )
}


function MenuComp(){
    const classes = styles();
    const hamApi = useSpringRef()
    const revealCanApi = useSpringRef()
    const {ham} = useAppData();
    const [open, setOpen] = useState(false);
    
    

    useEffect(()=>{

        displayArrCursor(false)
        setOpen(ham)
    },[ham])

    const hamStyles = useSpring({  
        ref: hamApi,
        from:{opacity:0,scale:0.9,display:'none'},
        // to: async (next, cancel) => {
        //     await next([{display:open ?'unset': 'block', opacity:open ? 0 : 1,scale:open ? 0.9 : 1},open ?{display:'none'}:{}])            
        //   },
        to:[{display:open ?'unset': 'block', opacity:open ? 0 : 1,scale:open ? 0.9 : 1},open ?{display:'none'}:{}]
    })



    // const transition = useTransition(open ? data : [], {
    //     ref: transApi,
    //     trail: 400 / data.length,
    //     from: { opacity: 0, scale: 0 },
    //     enter: { opacity: 1, scale: 1 },
    //     leave: { opacity: 0, scale: 0 },
    //   })

    useChain(ham ? [hamApi,revealCanApi] : [revealCanApi,hamApi], )



    return (
        <>
        <animated.div style={{ ...hamStyles,...classes.mainDiv,}}>
            <div className="menuInsideComp">
                <RevealCan open={ham} ref={revealCanApi} >
                    <div></div>
                    <div></div>
                    <div></div>
                </RevealCan>
            </div>    
        </animated.div>
        </>
    )
}

export default MenuComp;