import React, { useEffect, useState } from "react"
import { useChain, animated,useSpring,useSpringRef,useSprings,useTrail,config } from "@react-spring/web";
import displayArrCursor from "./displayArrCursor"
import useAppData from "../hooks/useAppData";
import colorVariables from "../sass/customvariables.scss"
import useWindowSize from "../hooks/useWindowSize";


const styles = () => ({
    mainDiv:{
        position:'absolute',              
        top:0,
        right:0,
        left:0,
        bottom:0,
        zIndex:2,
        height:'100vh',
        background:colorVariables.defaultBackColor,
        '&::after':{

        
        }
    },
    menuTexts:{
        position:'absolute',bottom:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontSize:'2rem',
        letterSpacing:'5px',
        fontFamily:colorVariables.defaultAppNameFont,
        color:colorVariables.defaultBackColor,
        backgroundColor:colorVariables.defaultColor,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
    }
})


function RevealCan({ open, children,ref,ref2,ref3,ref4 }){
    const items = React.Children.toArray(children)
    console.log(items[0])
    const classes = styles();
    const [width] = useWindowSize();
    const {menuProductsData} = useAppData();
    const [isMobile, setIsMobile] = useState(false)

    useEffect(()=>{
        console.log(width)
        setIsMobile((width < 770))
    },[width])

    const trail = useTrail(items.length,{ 
        ref:ref,
        delay:open ? 0 : 400,
        opacity: open ? 0 : 1,
        height: open ? 0 :  isMobile ?  150 :300,
        from:{opacity:0,height:0,}
    })
    const nameRevealSprings = useTrail(menuProductsData.length,({ ref:ref2,
        from :{height:0, opacity:0, width: isMobile ? '0%' :'100%'  }, 
        
        to:{height:open ? 0 :  isMobile ? 'inherit' : 70 , width: open ? isMobile ? '0%' : '100%' : isMobile ? '60%' : '100%'  , opacity:open ? 0 : 1,}, 
        delay:open ? 0 : 700,}))

        const imgRevealSprings = useTrail(menuProductsData.length,({ ref:ref3,
            from :{scale:0, opacity:0 }, 
            to:{scale:open? 0 : 1,  opacity:open ? 0 : 1},
            delay:open ? 0 : 700,
        }))

        const backImgRevealSprings = useTrail(menuProductsData.length,({ ref:ref4,
            from :{ opacity:0 }, 
            to:{opacity:open ? 0 : 0.6},
            delay:open ? 0 : 500,
        }))


        const [imgUpDownSprings,api] = useSprings(menuProductsData.length,(index) => ({ 
            // loop:true,
            // from :{translateY:-15}, 
            // to:[{translateY:0},{translateY:-15 }],
            // config:{mass: 1, tension: 380, frict ion: 120},
          
            
        }))

        useEffect(()=>{
            api.start()
        },[])

    return(
        <>

        {

        trail.map((style,index)=>(
        <animated.div key={index} className={'menuCards'} style={{
                    ...style, 
                    width: isMobile ? '100%' : 'unset' , 
                    flexGrow: isMobile ? 'unset' : 1 ,  
                    
            }}  >
                 <animated.img loading={"lazy"}  src={menuProductsData[index].imgBack} 
                style={{    
                    width:"100%", height:"100%", 
                    position: 'absolute',
                    zIndex: -1,
                    willChange:'opacity',
                    objectFit: 'cover',
                    borderRadius:'20px',
                    ...backImgRevealSprings[index],
                
 
                }} />
            <animated.div  style={{ ...imgRevealSprings[index] }}  className={'menuImgs'}   >
                <animated.div style={{...imgUpDownSprings[index], }} className={'menuImgsUpDn'}>  {items[index].props.children[0]} </animated.div>
            </animated.div>
            <animated.div  style={{...nameRevealSprings[index],   }} className={'menuTexts'} >
            {/* backgroundSize:'cover', backgroundImage:`url(${menuProductsData[index].imgBack})` */}
            <span>{items[index].props.children[1]}</span>
                {/* <img src={menuProductsData[index].imgBack} 
                style={{    
                    width:"100%", height:"100%", 
                    position: 'absolute',
                    zIndex: -1,
                    objectFit: 'cover',
                    opacity: 0.6,
                    borderBottomRightRadius:'20px',
                    borderBottomLeftRadius:'20px',
                }} /> */}
                
            </animated.div>
        </animated.div>
        ))}</>
    )
}


function MenuComp(){
    const classes = styles();
    const hamApi = useSpringRef()
    const revealCanApi = useSpringRef()
    const revealNamesApi = useSpringRef()
    const revealImgsApi = useSpringRef()
    const revealBackImgsApi = useSpringRef()
  
    const {ham,menuProductsData} = useAppData();
    const [open, setOpen] = useState(true);
    const [width] = useWindowSize();
    const [isMobile, setIsMobile] = useState(false)

    useEffect(()=>{
        console.log(width)
        setIsMobile((width < 770))
    },[width])
    

    useEffect(()=>{
        console.log(ham)
        displayArrCursor(false)
        setOpen(ham)
    },[ham])

    const hamStyles = useSpring({  
        ref: hamApi,
        from:{opacity:0,scale:0.9,display:'none'},
        // to: async (next, cancel) => {
        //     await next([{display:open ?'unset': 'block', opacity:open ? 0 : 1,scale:open ? 0.9 : 1},open ?{display:'none'}:{}])            
        //   },
        to:[{display:open ?'unset': 'block', opacity:open ? 0 : 1,scale:open ? 0.9 : 1},open ?{display:'none'}:{}],
        
    })


    // const nameRevealSprings = useSprings(menuProductsData.length,{  opacity: 1, ref })
   // const [nameRevealSprings, nameRevealSpringsApi] = useSprings(menuProductsData.length, index => ({ opacity: 1,ref }))




    // const transition = useTransition(open ? data : [], {
    //     ref: transApi,
    //     trail: 400 / data.length,
    //     from: { opacity: 0, scale: 0 },
    //     enter: { opacity: 1, scale: 1 },
    //     leave: { opacity: 0, scale: 0 },
    //   })

    useChain(!open ? [hamApi,revealCanApi,revealBackImgsApi,revealNamesApi,revealImgsApi, ] : [revealImgsApi,revealNamesApi,revealBackImgsApi,revealCanApi,hamApi], !open ? [0,0.5,0.6,0.7,1] : [])



    return (
        <>{        console.log(open)}
        <animated.div style={{ ...hamStyles,...classes.mainDiv,}}>
            { isMobile && <div style={{widht:'100%',height:'20%', background:'transparent'}} />}
            <div className="menuInsideComp">
                <RevealCan open={ham} ref={revealCanApi} ref2={revealNamesApi} ref3={revealImgsApi} ref4={revealBackImgsApi}  >
                    {
                        menuProductsData.map((v,i)=>{
                          return(<>
                                    <img src={v.img} className="menuimgCss"  />
                                   {v.text}

                               </>)
                        })
                    }
                </RevealCan>
            </div>    
        </animated.div>
        </>
    )
}

export default MenuComp;