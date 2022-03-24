import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { LoadingScreen } from "./ui/LoadingScreen"
import { createContext, useContext } from "react";
import { DataContext, DataProvider } from "../context/DataContext";

export const Layout = () => {
  const { contextData } = useContext(DataContext);
  return (
    <div>
      {contextData && contextData.loading === true && <LoadingScreen ></LoadingScreen>}
      <Navbar></Navbar>
      <div className="container">
        <Outlet></Outlet>
      </div>
    </div >
  )
}