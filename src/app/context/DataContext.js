import React, { createContext, useState } from "react";

export const DataContext = createContext({
    data: {},
    changeData: () => { }
});

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        loading: false
    });

    const changeData = (prop, value) => {
        console.log(data)
        setData({ ...data, [prop]: value });
    }

    return (
        <DataContext.Provider value={{ data, changeData }}>
            {children}
        </DataContext.Provider>
    );
}