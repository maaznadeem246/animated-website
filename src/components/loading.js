import React, { useEffect, useState } from "react"

import { useSpring, animated } from "react-spring"
import useWindowSize from "../hooks/useWindowSize"
import colorVariables from "../sass/customvariables.scss"
import "../sass/index.scss" 

const styles = ()=>({
    mainDiv:{
        position:'absolute',
        width:'100%',
        display:'flex',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    textCss:{
        fontFamily:colorVariables.defaultAppNameFont,
        position:'absolute',
        color:colorVariables.$defaultColor,
        fontWeight:600,
        letterSpacing:4,
        fontSize:'1.8rem',
        width:'100%',
        display:'flex',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',

    }
})

function Loading(){
    const classes = styles() 
    const [width] = useWindowSize();
    const [isMobile, setIsMobile] = useState(false)
    console.log(width)


    const stylesSp = useSpring({
        loop:true,
        to: [{height: '43%',}, { height: '0%' }],
        from: {height: '0%', opacity: 0.7  },
        config:{duration:1500,}
      })
      const stylesSpSec = useSpring({
        loop:true,
        to: [{height: '45%',}, { height: '0%', }],
        from: {height: '0%', opacity: 0.7  },
        config:{duration:1500,}
      })

      useEffect(()=>{
        console.log(width)
        setIsMobile((width < 430))
    },[width])

    return(
        <div style={classes.mainDiv}>

        <div className="canStyle"  style={ {width:  isMobile ? '130px': '150px' , height: isMobile ?'210px' : '250px' }}>
        <div  style={ {...classes.textCss, fontSize:  isMobile ? '1.4rem': '1.8rem'  }}>Loading</div> 
            <animated.div
                style={{
                    position:'absolute',
                    height: '100%',
                    width:'100%',
                    // borderRadius:'10px',
                    backgroundColor: colorVariables.defaultColor,
                    bottom:0,
                    ...stylesSp,
                }}
            />

<animated.div
                style={{
                    position:'absolute',
                    height: '100%',
                    width:'100%',
                    // borderRadius:'10px',
                    backgroundColor:colorVariables.defaultColor,
                    top:0,
                    
                    ...stylesSpSec,
                }}
            />

        </div>

        </div>
    )
}

export default Loading;