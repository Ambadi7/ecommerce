import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const {Option} = Select

export const UpdateProduct = () => {
    const [collections,setCollections] = useState([])
    const [collection,setCollection] = useState("")
    const [file,setFile] = useState("")
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [quantity,setQuantity] = useState("")
    const [shipping,setShipping] = useState(0)
    const [id,setId] = useState("")

    const navigate = useNavigate()

    //use params
    const params = useParams()


    //get single product
    const getSingleProduct = async () =>{
        try{
            const {data} = await axios.get(`/api/v1/product/single-product/${params.slug}`)
            setName(data.product.name)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
            setId(data.product._id)
            setCollection(data.product.collection._id)

        }catch(error){
            console.log(error)
            toast.error(`Something went error in fetching product`)
        }
    }

    //getsinglecollection calling
    useEffect (() =>{
        getSingleProduct()
        //eslint-disable-next-line
    },[] )

    //fetching all collection
    const getAllCollection = async () => {
        try{
            const {data} = await axios.get("/api/v1/collection/get-allcollection")
            if(data && data.success){
                setCollections(data.collection)
            }
        }catch(error){
            console.log(error)
            toast.error(`Something wentwrong in fetching collection ${error}`)
        }
    }
    //getallcollection function calling
    useEffect(()=>{
        getAllCollection()
    },[])

    //Handle Update
    const hangleUpdate = async (e) => {
        e.preventDefault();
        console.log(`name ${name},des ${description}, price ${price}, quan ${quantity} , collect ${collection} , ship ${shipping},photo ${file}`)

        if(!name || !description || !price || !quantity || !collection || !shipping){
            toast.error("Please fill in all required")
            return
        }
        try{
            const productData = new FormData();
            productData.append("name",name);
            productData.append("description",description)
            productData.append("price",price)
            productData.append("quantity",quantity)
            file && productData.append("photo",file)
            productData.append("collection",collection)
            productData.append("shipping",shipping)

            const { data } = await axios.put(`/api/v1/product/update-product/${id}`,productData)
            console.log(data)
            console.log(productData)
            if (data?.success){
                toast.success(data?.message)
                navigate("/dashboard/admin/products")
            } else {
                toast.success(`Product updated successfully`)
                navigate("/dashboard/admin/products")
            }

        }catch(error){
            console.log(error)
            toast.error(`Error Update Product ${error}`)
        }
    }

    
return (
    <div>UpdateProduct
        <form onSubmit={hangleUpdate} className='flex flex-col gap-4 text-black'>
            <Select
            placeholder='Select a Collection'
            size='Large'
            showSearch
            onChange={(value)=>{
                setCollection(value)
            }}
            value={collection}
            className='w-96'>
                {
                    collections && collections.map((item)=>(
                        <Option key={item._id} value={item._id}>{item.name}</Option>
                    ))
                }
            </Select>

            <div>
                <label>
                    {file ? file.name : "Upload Image"}
                    <input type='file'
                    name='photo'
                    accept='image/*'
                    onChange={(e)=>setFile(e.target.files[0])}
                    hidden
                    />
                </label>
            </div>

            <div>
            {
                    file ? (
                        <div>
                            <img src={URL.createObjectURL(file)} alt="product image" 
                            className='h-[200px]:'
                            />
                        </div>
                    ) : (
                        <img src={`/api/v1/product/product-photo/${id}`} alt="product image" 
                            className='h-[100px]:'
                            />
                    )
            }
            </div>

            <div className='flex flex-col gap-4'>
                <div>
                    <input type="text"
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className='w-96 bg-white rounded-md p-2'
                    />
                </div>
                
                <div>
                    <textarea
                    placeholder='description'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    className='w-96 bg-white rounded-md p-2'
                    >
                    </textarea>    
                </div>

                <div>
                    <input type="text" 
                    placeholder='price'
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    className='w-96 bg-white rounded-md p-2'
                    />

                </div>

                <div>
                    <input type="text" 
                    placeholder='quantity'
                    value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}
                    className='w-96 bg-white rounded-md p-2'
                    />
                </div>
                <div>
                    <Select placeholder='Choose Shipping' size='large'
                    value={shipping ? "Yes" : "No"}
                    onChange={(value)=>{
                        setShipping(value)
                    }}
                    >
                        <Option value="0">Yes</Option>
                        <Option value="1">No</Option>
                    </Select>

                </div>
            </div>
                    <button type='submit' className='w-96 bg-blue-500  rounded-md p-2'>Update</button>
            <div>

            </div>
            
        </form>
    </div>
)
}
