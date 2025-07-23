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
import { UserProfile } from "./pages/user/UserProfile"
import UserOrders from "./pages/user/UserOrders"
import ManageUsers from "./pages/admin/ManageUsers"
import CreateCollection from "./pages/admin/CreateCollection"
import CreateProduct from "./pages/admin/CreateProduct"
import Product from "./pages/admin/Product"
import { UpdateProduct } from "./pages/admin/UpdateProduct"
import SingleProduct from "./pages/SingleProduct"

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
          <Route path="singleproduct" element={<SingleProduct/>} />
          <Route path="dashboard" element={<PrivateRoute/> }>
            <Route path="user" element={<Dashboard/>}>
              <Route path="profile" element={<UserProfile/>}/>
              <Route path="orders" element={<UserOrders/>}/>
            </Route>
          </Route>
          <Route path="dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>}>
              <Route path="manage-users" element={<ManageUsers/>}/>
              <Route path="create-collection" element={<CreateCollection/>}/>
              <Route  path="create-product" element={<CreateProduct/>}/>
              <Route path="products" element={<Product/>}/>
              <Route path="update-product/:slug" element={<UpdateProduct/>}/>
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
