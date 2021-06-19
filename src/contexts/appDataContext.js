import React, {
    createContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import Can1 from "../images/can1.png"
import Can2 from "../images/can2.png"
import Can3 from "../images/can3.png"

import Can1Back from "../images/can1back.png"
import Can2Back from "../images/can2back.png"
import Can3Back from "../images/can3back.png"
import frontBack from "../images/frontback.png"


const initialState = {
    productsData:[
        'welcome',
        Can1,Can2,Can3
    ],
    productsBackData:[
        frontBack,Can1Back,Can2Back,Can3Back
    ],
    prdctAnimIndex:0,
    appName:'Cold & Can'
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_PRDCTANIMINDEX':
            const {data}  = action.payload;
            console.log(data)
            return{
                ...state,
                prdctAnimIndex:data,
            }
        case 'RESET_PRDCTANIMINDEX':
            return {
                ...state,
                prdctAnimIndex:0
            }
    }

}


const AppDataContext = createContext({
    ...initialState,
    resetData:()=>{}
});


export const AppDataProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    

    
    
    const updatePrdctAnimIndex = (d) => {
        console.log(d)
        dispatch({
            type: 'UPDATE_PRDCTANIMINDEX',
            payload: {
                data: d
            }})
    }

    const resetPrdctAnimIndex = () => {
        dispatch({
            type: 'RESET_PRDCTANIMINDEX',
        })
    }



    return (
        <AppDataContext.Provider
            value={{
                ...state,
                updatePrdctAnimIndex,
                resetPrdctAnimIndex
            }}
        >
            {children}
        </AppDataContext.Provider>
    )
}




export default  AppDataContext  