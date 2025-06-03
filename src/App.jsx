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
import ConfirmEmail from "./Pages/ConfirmEmail"
import { AuthProvider } from "./Contexts/AuthContext"
import Bookings from "./Pages/Bookings"


function App() {

  return (
    <CookiesProvider>
      <AuthProvider>
      <Routes>
        
        <Route element={<PortalLayout />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Route>

        <Route element={<CenterLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-email/:email" element={<ConfirmEmail />} />
        </Route>

        
        <Route path="*" element={<NotFound />} />      
      </Routes>
      </AuthProvider>
    </CookiesProvider>
  )
}

export default App
