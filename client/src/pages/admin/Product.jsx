
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const Product = () => {
    const [products ,setProducts] =useState([])
    //get all-all products
    const getAllProducts = async ()=>{
        try{
            const {data} = await axios.get("/api/v1/product/get-allproducts")
            if(data && data.success){
                setProducts(data.products)
                console.log(products)
            }

        }catch(error){
            console.log(error)
            toast.error(`Error in fetching all product ${error}`)
        }
    }

    //delete product
    const deleteProduct = async (id) =>{
        try{
            const {data} = await axios.delete(`/api/v1/product/product-delete/${id}`)

            if(data && data.success){
                toast.success(data.message)
                getAllProducts()
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(`Error in delete product ${error}`)
        }
    }

    useEffect(() =>{
        getAllProducts()
    },[])
  return (
    <div>Product
    <div className='flex flex-wrap gap-4'>
        {
            products.map((item) =>{
                return(
                    <div key={item._id} className='w-88'>
                        <div className="max-w-xs rounded-md shadow-md bg-gray-50 text-gray-800">
                            <div className="flex flex-col justify-between p-6 space-y-8">
                            <img src={`/api/v1/product/product-photo/${item._id}`} alt="" className="h-60 w-auto object-cover object-center rounded-t-md bg-gray-500" />
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-semibold tracking-wide">{item.name}</h2>
                                    <p className="text-gray-800">{item.description}</p>
                                    <div className='flex justify-between'>
                                        <h1 className="text-gray-800">Price : {item.price}</h1>
                                        <h1 className="text-gray-800">Quantity :{item.quantity}</h1>
                                    </div>
                                    
                                </div>
                                <div className='flex gap-3 justify-between'>
                                        <Link to={`/dashboard/admin/update-product/${item.slug}`} className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-orange-600 text-gray-50">Update</Link>
                                        <button onClick={()=> { deleteProduct(item._id)}} className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-orange-600 text-gray-50">Delete</button>
                                    </div>
                                <button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-orange-600 text-gray-50">Read more</button>
                            </div>
                        </div>
                    </div>
                    
                )
            })
        }
    </div>
    </div>
  )
}

export default Product