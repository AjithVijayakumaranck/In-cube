import React, { createContext, useState } from "react";

export const SideBarWidth = createContext();
export const SideBarWidthProvider = ({children})=>{
    const [open,setOpen]=useState("")  
    return(
        <SideBarWidth.Provider 
        value={{
            wid: [open,setOpen]
        }}
        >
            {children}
        </SideBarWidth.Provider>
    )
}

