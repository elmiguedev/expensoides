import { Layout } from "./components/Layout";
import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
