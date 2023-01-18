import { createContext, useState } from "react";
export const AppContext=createContext();
export default function AppContextProvider({children}) {
    
    const[data,setData]=useState({})

     return  <AppContext.Provider value={{data,setData}}>
                {children}
            </AppContext.Provider>
}

