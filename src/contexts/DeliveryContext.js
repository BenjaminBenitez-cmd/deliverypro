import React, { createContext, useReducer } from 'react';

export const DeliveryContext = createContext();

const initialState = {
    deliveries: [],
    filter: {
        column: '',
        value: '',
        checked: false
    },
}

const mainReducer = (state, action) => {
    switch (action.type) {
        case "ADD_DELIVERY":
            return { ...state, deliveries:[...state, action.payload]};
        case "FETCH_DELIVERIES":
            return { ...state, deliveries: [...action.payload]};
        case "FILTER_DELIVERY":
            return {...state, filter: {...state.filter, ...action.payload }};
        default:
            return state;
    }
}

export const DeliveryContextProvider = (props) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return (
        <DeliveryContext.Provider value={{ state, dispatch }}>
            {props.children}
        </DeliveryContext.Provider>
    )  
};