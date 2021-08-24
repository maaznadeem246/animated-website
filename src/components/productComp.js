import React, { useEffect } from "react"
import { useParams } from "react-router-dom";
import displayArrCursor from "./displayArrCursor"

function ProductComp(){
    let { prdId } = useParams();
    

    useEffect(()=>{
        displayArrCursor(false)
    },[])
    return(
        <>Product page {prdId}</>
    )
}

export default ProductComp;