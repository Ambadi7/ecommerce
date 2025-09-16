
import axios from 'axios'
import CartContext from '../../context/CartContext'
import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'

const Cart = () => {
  const [cart,setCart] = useContext(CartContext)
  const {auth} = useContext(AuthContext)
  const [count,setCount] = useState(1)
  console.log(auth.user)

  
  
  //decerement in button
  const decrement = () => {
    setCount(count > 0 ? count-1 :count)
  }

  //Increment
  const increment = () =>{
     setCount(count+1)

  }

  //remove cart item from local storage
  const removeCartItem = (pid) => {
    try{
      let myCart = [...cart]
      let index = myCart.findIndex((item) => item._id === pid)
      myCart.splice(index,1)
      setCart(myCart)
      localStorage.setItem("cart",JSON.stringify(myCart))
    } catch (error){
      console.log(error)
    }
  }

  //total price setting
  const totalPrice = () => {
    try{
      let total = 0
      cart?.map((item) => {
        total = total + item.price
      })
      return total.toLocaleString("en-IN" , {
        style : "currency",
        currency : "INR",
      })
    }catch(error) {
      console.log(error)
    }
  }

  //handle check out
  const handleCheckout = async (amount) => {
    try{

      const cleanAmount = Number(
        amount.toString().replace(/[^\d.-]/g,"")
      )
      console.log("Sending clean amount:",cleanAmount)
      const {data:keyData} = await axios.get(`/api/v1/product/getkey`)
      const {key} = keyData
      const {data :orderData} = await axios.post(`/api/v1/product/payment`,{amount:cleanAmount})
      const {order} = orderData
      console.log(order)
      console.log(key)
      // Open Razorpay Checkout
      const options = {
        key: key, // Replace with your Razorpay key_id
        amount: cleanAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Ecommerce',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: 'api/v1/product/payment-verification', // Your success URL
        prefill: {
          name: auth?.user?.name || 'your name',
          email: auth?.user?.email || "your email",
          contact: auth?.user?.phone || ""
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <div>
        <h1>Shoping Cart</h1>
        <h1>hey User</h1>
        <h2>You have {cart.length} items in your cart</h2>
        <div className='flex'>
          <div className='w-3/4 flex flex-col gap-4 '>
          {
            cart.map((item) =>{
              return(
              <div key={item.id} className="relative flex flex-col  max-w-2xl p-6 divide-y xl:flex-row xl:divide-y-0 xl:divide-x bg-gray-50 text-gray-800 divide-gray-300">
                <div className="flex items-center gap-3 p-3">
                  <img alt="" src={`/api/v1/product/product-photo/${item._id}`} className="object-cover w-32 h-32 bg-gray-500 rounded-md shadow" />
                </div>
                <div className="p-3 space-y-1">
                  <h3 className="text-3xl font-semibold">{item.name}</h3>
                  <h3 className="text-xl font-semibold">Price {item.price}</h3>
                  <h3 className="text-xl font-semibold">{item.description}</h3>
                  <div className='flex gap-2'>
                    <button onClick={increment} className='h-6 w-6 flex rounded-md text-white items-center justify-center bg-black'>+</button>
                    <h1>{count}</h1>

                    <button onClick={decrement} className='h-6 w-6 flex rounded-md text-white items-center justify-center bg-black'>-</button>

                  </div>
                  <button type="button"
                   onClick={() => {
                    removeCartItem(item._id)
                   }} 
                   className="inline-block px-2 py-1 text-sm font-semibold rounded-md bg-orange-600 text-gray-50">Remove</button>
                  
                </div>

            </div>
              )
            })
          }
          </div>
          <div className='w-1/4 flex flex-col items-center'>
            <h1>CheckOut</h1>
            <h1>Price details</h1>
            <h1>Total Amount :{totalPrice()}</h1>

            <button
             onClick={()=> {handleCheckout(totalPrice())}}
             className='w-3/5 p-2 bg-green-500 rounded-md' 
             >Proceeed To Buy</button>



          </div>

        </div>
      </div>
    </>
  )
}

export default Cart