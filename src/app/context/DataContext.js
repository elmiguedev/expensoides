import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [contextData, setContextData] = useState({
        loading: false
    });

    const changeContextData = (prop, value) => {
        setContextData({ ...contextData, [prop]: value });
    }

    return (
        <DataContext.Provider value={{ contextData, changeContextData }}>
            {children}
        </DataContext.Provider>
    );
}