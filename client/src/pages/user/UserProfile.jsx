import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import { toast } from "sonner"
import axios from "axios"


export const UserProfile = () => {
  //context
  const { auth , setAuth } = useContext(AuthContext)

  //state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [address, setAddress] = useState("")
  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const { data } = await axios.put("/api/v1/auth/profile",{
        name,
        email,
        phone,
        address
      })
      console.log(data)

      if(data?.error) {
        toast.error(data?.error)
      } else {
        setAuth({...auth,user : data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem("auth",JSON.stringify(ls))
        toast.success("Profile Updated Successfully")
      }
    }catch(error){
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  //get user data
  useEffect(() => {
    const { name,email,phone,address} =auth?.user 
    setName(name)
    setEmail(email)
    setAddress(address)
    setPhone(phone)
  },[auth?.user])


  return (
    <>
      <div>
        <h1>
          My Profile
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input 
          type="text"
          name={name}
          value={name}
          onChange={ (e) => {
            setName(e.target.value)
          }}
          placeholder="Name" 
          className="h-10 p-2 rounded-md w-auto lg:w-4/6 outline-none"  
           />

           <input 
          type="text"
          name={email}
          value={email}
          readOnly
          className="h-10 p-2 rounded-md w-auto lg:w-4/6 outline-none"  
           />

           {/* <input 
          type="password"
          name={password}
          value={password}
          onChange={ (e) => {
            setPassword(e.target.value)
          }}
          placeholder="Enter Your New password" 
          className="h-10 p-2 rounded-md w-auto lg:w-4/6 outline-none"  
           /> */}

           <input 
          type="text"
          name={phone}
          value={phone}
          onChange={ (e) => {
            setPhone(e.target.value)
          }}
          placeholder="Phone" 
          className="h-10 p-2 rounded-md w-auto lg:w-4/6 outline-none"  
           />

           <input 
          type="text"
          name={address}
          value={address}
          onChange={ (e) => {
            setAddress(e.target.value)
          }}
          placeholder="Address" 
          className="h-10 p-2 rounded-md w-auto lg:w-4/6 outline-none"  
           />

           <button type='submit' className="h-10 bg-blue-600 w-2/6 rounded-lg">Update Profile</button>
        </form>
      </div>
    </>
    
  )
}
