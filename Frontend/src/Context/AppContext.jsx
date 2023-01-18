import { createContext, useState } from "react";
export const AppContext=createContext();
export default function AppContextProvider({children}) {
    
    const[data,setData]=useState({})
    const [isauth,setIsauth]=useState(false)

     return  <AppContext.Provider value={{data,setData,isauth,setIsauth}}>
                {children}
            </AppContext.Provider>
}

