import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Select } from 'antd'
const {Option} = Select

const CreateProduct = () => {
  const [collection,setCollection] = useState([]) 
  const [file,setFile] = useState("")
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [quantity,setQuantity] = useState("")
  const [shipping,setShipping] = useState(false)

  //Create product Handle Create
  const handleCreate = async(e) =>{
    e.preventDefault()
    try{
      const productData = new FormData()
      productData.append("collection",collection)
      productData.append("name",name)
      productData.append("photo",file)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      productData.append("shipping",shipping)
      const {data} = await axios.post("/api/v1/product/create-product",productData)
      if(data.success){
        toast.success(data.message)
        console.log(productData)
      }
      else{
        toast.error(data.message)
      }
      
    }catch(error){
      console.log(error)
      toast.error(`Error in while create product ${error}`)
    }
  }

  useEffect(()=>{
    getAllCollection()
  },[])

  //fetch collection
  const getAllCollection = async () => {
    try{
      const {data} = await axios.get("/api/v1/collection/get-allcollection")
      if(data.success){
        
        setCollection(data.collection)
        console.log(collection)
      }
    }catch(error){
      console.log(error)
      toast.error(`Something went wrong in get collectio ${error}`)
    }
  }
  return (
    <div>CreateProduct

      <div>
        <form className='flex flex-col gap-4 p-5 text-black'>
        
          <Select
          placeholder="Choose Collection" 
          onChange={(value)=>{
            setCollection(value)
            }} 
          showSearch 
          size='large' 
          className='w-96 '
          >
            {
              collection && collection.map ((item) => (
                  <Option key={item._id} value={item._id}>{item.name}</Option>
              ))
            }
          </Select>

          <div>
            <label className='w-96 '>
              {file ? file.name :"Upload Image"}
              <input type="file" 
              name='photo'
              accept='image/*'
              onChange={(e) =>setFile(e.target.files[0])}
              hidden />
            </label>
          </div>

          <div className='w-96 '>
            {
              file && (
                <div>
                  <img src={URL.createObjectURL(file)} alt="image product" className='h-[200px]'/>
                </div>
              )
            }
          </div>

          <div className='flex flex-col gap-4'>
            <div className='w-96 '>
              <input type="text" placeholder='Enter Your Name'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
              className='w-96 bg-white rounded-md p-2'/>
            </div>

            <div>
              <textarea placeholder='Descripton' 
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
              required
              className='w-96 bg-white rounded-md p-2'>
              </textarea>
            </div>

            <div>
              <input type="text" placeholder='Price' 
              value={price}
              onChange={(e)=> setPrice(e.target.value)}
              required
              className='w-96 bg-white rounded-md p-2'/>
            </div>
            <div>
              <input type="text" placeholder='Quantity'
              value={quantity}
              onChange={(e)=> setQuantity(e.target.value)}
              className='w-96 bg-white rounded-md p-2'/>
            </div>
            <div>
              <Select placeholder='Select Shipping' size='large'  
              onChange={(value)=>{
                setShipping(value)
              }}
              className='w-96 '>
                <Option value="0">Yes</Option>
                <Option value="1">No</Option>
              </Select>
            </div>
            <div>
              <button type='submit' className='w-96 bg-blue-600 rounded-md p-2'>Create Product</button>
            </div>
          </div>

          
        </form>
      </div>
      
    </div>
  )
}

export default CreateProduct