import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { DataProvider } from "./context/DataContext";
export const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppRoutes></AppRoutes>
      </BrowserRouter>
    </DataProvider>
  )
}
