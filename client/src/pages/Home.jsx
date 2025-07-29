import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import { toast } from 'sonner'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Checkbox,Radio } from "antd";
import { prices } from '../Data/Data'


const Home = () => {
  const [products,setProducts] = useState([])
  const [collections ,setCollections] = useState([])
  const [checked ,setChecked] = useState("")
  const [radio,setRadio] = useState([])
  const [totalProducts ,setTotalProducts] = useState(0)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)

  useEffect(
    () =>{getAllCollection(),
      getTotal()
    },[]
  )
  useEffect(()=> {
    if(page === 1) return;
    loadMore();
  },[page])
  const getAllCollection = async () =>{
    try{
      const {data} = await axios.get("/api/v1/collection/get-allcollection")
      console.log(data)
      if(data && data.success){
        setCollections(data.collection)
        console.log(collections)
      }
    }catch(error){
      console.log(error)
      toast.error(`Something went wrong in get collectio ${error}`)
    }
  }

  const getAllProducts = async () =>{
    try{
      setLoading(true)
      const  {data} =await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      
      if(data && data.success){
        setProducts(data.products)
        console.log(products)
      }
    }catch(error){
      setLoading(false)
      console.log(error)
      toast.error(`Error in fetching product lists ${error}`)
    }
  }

  //load more
  const loadMore = async () => {
    try{
      //show loading indicator like spinner
      setLoading(true)
      //api calls to get products of current page
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`)
      //hide loading indicator 
      setLoading(false)
      //add new products to existing ones
      setProducts([...products, ...data.products])


    }catch(error){
      console.log(error)
      setLoading(true)
    }
  }

  //get Total Count
  const getTotal = async () => {
    try{
      const {data} = await axios.get("/api/v1/product/product-count")
      setTotalProducts(data?.totalProducts)
    }catch(error){
      console.log(error)
    }
  }

  //filterproduct
  const filterProduct = async () => {
    try{
      const {data} = await axios.post("/api/v1/product/product-filters",{checked , radio})
      if(data && data.success){
        setProducts(data?.products)

      }
    }catch(error){
      console.log(`Error in filterin product ${error}`)
      toast.error(error)
    }
  }

  
  useEffect(()=>{

    if(!checked.length || !radio.length){
      getAllProducts()
    }
  },[checked.length ,radio.length])

  useEffect(() =>{
    if(checked.length || radio.length){
      filterProduct()
    }
  },[checked,radio])

  //handlefilter for collection filter
  const handlefilter = (value,id) => {
    //save all checked items in a a variable
    let all =[...checked]
    //check the received value and push it to all []
    if(value){
      all.push(id)
    }else{
      //filter
      all=all.filter((item) => item!==id)
    }
    setChecked(all)
  }

  return (
    <div>
      <div>
        <Banner/>
      </div>
      <div className='flex'>
        <div>
          <div className='w-1/6 p-2 px-6'>
            Filter by collection
            {
              collections.map((item) =>{
                return(
                  <div key={item._id}>
                    <Checkbox onChange={(e) =>handlefilter(e.target.checked,item._id)}>
                      {item.name}
                    </Checkbox>
                  </div>
                )
              })
            }
          </div>

          Filter by price
          <div className='p-2 px-6'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              { 
                prices.map((item) => (
                  <div key={item._id} >
                    <Radio value={item.array}>{item.price}</Radio>
                  </div>
                ))
              }
            </Radio.Group>

          </div>
          <div>
            <button onClick={()=>window.location.reload()}>Clear All</button>
          </div>
        </div>
        <div>
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
                        </div>
                      </div>
                    </Link>
                    
                  </div>
                )
              })
            }
        
          </div>
          <div>
            <div>{totalProducts}</div>
            <div>
              {
                products && products.length <totalProducts && (
                  <button
                    onClick={(e) =>{
                      e.preventDefault()
                      setPage(page+1)
                    }}
                  >
                    {loading ? "Loading..." : "Load more"}
                  </button>
                )
              }
            </div>
          </div>
        </div>

      </div>
      
      
    </div>
  )
}

export default Home