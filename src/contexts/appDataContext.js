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
        {img:"welcom",text:'discover the range', textSecDesk:"Click anywhere to use", textSecMob:"Tap anywhere to use",},
        {img:Can1,text:"Oh that's Grapes", textSecDesk:"Queensland Blue Grapes and Coca", textSecMob:"Queensland Blue Grapes and Coca", },
        {img:Can2,text:"Oh that's Banana", textSecDesk:"Almond Milk and Apple", textSecMob:"Almond Milk and Apple",},
        {img:Can3,text:"Oh that's Orange", textSecDesk:"Peckham Pear and Raspberry", textSecMob:"Peckham Pear and Raspberry",}
    ],
    productsBackData:[
        frontBack,Can1Back,Can2Back,Can3Back
    ],
    prdctAnimIndex:0,
    appName:'Cold Can',
    ham:false,
    menuProductsData:[
        {img:Can1,text:"Grapes",  },
        {img:Can2,text:"Banana", },
        {img:Can3,text:"Orange", }
    ],
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
        case 'UPDATE_HAM':
            const {ham}  = action.payload;
            return {
                ...state,
                ham:ham
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
    
        dispatch({
            type: 'UPDATE_PRDCTANIMINDEX',
            payload: {
                data: d
            }})
    }


    const updateHam = (d) => {
        dispatch({
            type: 'UPDATE_HAM',
            payload: {
                ham: d
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
                resetPrdctAnimIndex,
                updateHam
            }}
        >
            {children}
        </AppDataContext.Provider>
    )
}




export default  AppDataContext;  