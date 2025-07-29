import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
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
    </div>
  )
}

export default CollectionProduct