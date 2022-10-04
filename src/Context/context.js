import React, { createContext, useState } from "react";

export const MyContext = createContext();
export const MyContextProvider = ({children})=>{
    const [ userConfig, setUserConfig] = useState({
       name:"Ajith"
    });  
    return(
        <MyContext.Provider 
        value={{
            user: [ userConfig,setUserConfig]
        }}
        >
            {children}
        </MyContext.Provider>
    )
}

// export const SideBarWidth = createContext();
// export const SideBarWidthProvider = ({children})=>{
//     const [open,setOpen]=useState(true)  
//     return(
//         <SideBarWidth.Provider 
//         value={{
//             wid:[open,setOpen]
//         }}
//         >
//             {children}
//         </SideBarWidth.Provider>
//     )
// }

