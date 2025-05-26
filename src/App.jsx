import { CookiesProvider } from "react-cookie"
import { Outlet, Route, Routes } from "react-router-dom"
import PortalLayout from "./Layouts/PortalLayout"
import { DashBoard } from "./Pages/DashBoard"
import CenterLayout from "./Layouts/CenterLayout"
import { Login } from "./Pages/Login"
import { NotFound } from "./Pages/NotFound"
import { Register } from "./Pages/Register"
import { Events } from "./Pages/Events"
import EventDetails from "./components/eventCard/EventDetails"


function App() {

  return (
    <CookiesProvider>
      <Routes>
        
        <Route element={<PortalLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Route>

        <Route element={<CenterLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        
        <Route path="*" element={<NotFound />} />      
      </Routes>
    </CookiesProvider>
  )
}

export default App
