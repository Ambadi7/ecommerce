import { Routes, Route} from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Collection from "./pages/Collection"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Cart from "./pages/Cart"
import ErrorPage from "./pages/ErrorPage"
import Dashboard from "./pages/user/Dashboard"
import PrivateRoute from "./components/routes/PrivateRoute"
import AdminDashboard from "./pages/admin/AdminDashboard"
import { AdminRoute } from "./components/routes/AdminRoute"

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="about" element={<About/>} />
          <Route path="collection" element={<Collection/>} />
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<SignUp/>} />
          <Route path="cart" element={<Cart/>} />
          <Route path="dashboard" element={<PrivateRoute/> }>
            <Route path="user" element={<Dashboard/>}/>
          </Route> 
          <Route path="dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>}/>
          </Route>
          <Route path="*" element={<ErrorPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
