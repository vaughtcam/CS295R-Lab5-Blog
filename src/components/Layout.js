import { Link, Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Header from "./Header"

 function Layout() {
  return (
    <>
      
    <NavBar />
    <Header />
    <Outlet />
    </>
  )
}

export default Layout