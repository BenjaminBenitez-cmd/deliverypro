import React, { useState, createContext } from 'react';

export const DeliveryContext = createContext();

export const DeliveryContextProvider = (props) => {
    const [deliveries, setDeliveries] = useState([]);

    const addDelivery = (newDelivery) => {
        setDeliveries([ newDelivery, ...deliveries]);
    }

    return (
        <DeliveryContext.Provider value={{ deliveries, setDeliveries, addDelivery }}>
            {props.children}
        </DeliveryContext.Provider>
    )  
};