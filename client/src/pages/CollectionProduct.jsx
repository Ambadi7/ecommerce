import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams ,Link } from 'react-router-dom'
import { toast } from 'sonner'
const CollectionProduct = () => {
  const [products,setProducts] = useState([])
  const [collections,setCollections] = useState([])
  const params = useParams()

  useEffect (()=> {
    if(params?.slug){
      getProductsByCollection()
    }
  },[params?.slug])
  const getProductsByCollection = async () => {
    try{
      const {data} = await axios.get(`/api/v1/product/product-collection/${params.slug}`)
      setCollections(data?.collection)
      setProducts(data?.products)
    }catch(error){
      console.log(error)
      toast.error(error)
    }
  }
  console.log(products)
  console.log(collections)
  return (
    <div>CollectionProduct
      <h1>{collections?.name}</h1>
      <h1>{products?.length}</h1> 
      {
        products.length ? 
          <div className='p-4 px-10 flex w-5/6 flex-row flex-wrap gap-7 justify-center'> 
            {
              products.map((item)=>{
                return(
                  <div key={item._id} className=" w-84 shadow-sm">
                    <Link to={"singleproduct"}>
                      <div className='flex justify-center'>
                        <img
                          src={`/api/v1/product/product-photo/${item._id}`} className='h-60 w-auto flex justify-center items-center '
                          alt={item.name} />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl font-semibold tracking-wide">{item.name}</h2>
                        <p className='text-gray-800'>{item.description}</p>
                        <h1 className='text-gray-800'>{item.price}</h1>
                        <div className="card-actions justify-end px-6 p-2">
                          <button className=" flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-orange-600 text-gray-50">Buy Now</button>
                          <button 
                          className=" flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-orange-600 text-gray-50">Add to cart</button>
                        </div>
                      </div>
                    </Link>
                    
                  </div>
                )
              })
            }
        
          </div>
         : 
          <div>No products</div>
      }
    </div>
  )
}

export default CollectionProduct