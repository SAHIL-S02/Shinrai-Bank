import React, { Children, useState } from 'react'
import { createContext } from 'react';

export const SideBarContextInfo = createContext();

const SideBarContext = ({children}) => {
    const [sideBar, setSideBar] = useState("dashboard");
  return (
    <SideBarContextInfo.Provider value={{sideBar, setSideBar}}>
        {children}
    </SideBarContextInfo.Provider>
  )
}
export default SideBarContext