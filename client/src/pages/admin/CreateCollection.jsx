import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import CollectionForm from '../../components/forms/CollectionForm'
import { Modal } from 'antd'
import Item from 'antd/es/list/Item'

const CreateCollection = () => {
  const [collection , setCollection] = useState([])
  const [name,setName] = useState("")
  const [selected,setSelected] = useState(null)
  const [updatedName,setUpdatedName] = useState(" ")

  //antdesign
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //handle form for create collection
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const {data} =await axios.post("/api/v1/collection/create-collection",{name})

      if(data && data.success){
        toast.success(data.message)
        getAllCollection()
        setName("")
      }
      else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(`Error in creating Collection ${error}`)
      toast.error(`Something went wrong while creating collection${error}`)

    }
  }

  //Handle update
  const handleUpdate = async(e) =>{
    e.preventDefault()
    try{
      const {data} = await axios.put(`/api/v1/collection/update-collection/${selected._id}`,{name : updatedName})

      if(data && data.success){
        setSelected(null)
        setUpdatedName(" ")
        handleCancel()
        getAllCollection()
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(`Error in update ${error}`)
      toast.error(`Error in update ${error}`)
    }
  }
  //fetch all collection from backend
  const getAllCollection = async () =>{
    try{
      const {data} = await axios.get 
      if(data.success){
        setCollection(data.collection)
        // toast.success(`Successfully fetch all collection`)
        
      }
    }catch(error){
      console.log(error)
      toast.error(`Something went wrong getting all collection ${error}`)
    }
  }
  

  useEffect(()=>{
    getAllCollection()
  },[])

  //delete collection
  const deleteCollection = async (id) =>{
    try{
      
      const {data} = await axios.delete(`/api/v1/collection/delete-collection/${id}`)

      if(data && data.success){
        toast.success(data.message)
        getAllCollection()
      }
      else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error)
      toast.error(`Error in delete collection ${error}`)
    }
  }

  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">CreateCollection</h2>
        
        <CollectionForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Collection name</th>
                <th className="p-3">Action</th>
                
              </tr>
            </thead>
            {collection.map((item)=>{
        return (
            <tbody>
              <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                <td className="p-3">
                  <p>{item.name}</p>
                </td>
                <td className="p-3">
                  {/* <p></p> */}
                  <div className='flex gap-2'>


                    <h1 onClick={()=>{showModal() ; setUpdatedName(item.name);setSelected(item)}}>Update</h1>
                    <button onClick={()=>{deleteCollection(item._id)}}>Delete</button>
                  </div>
                </td>
                {/* <td className="p-3 text-right">
                  <span className="px-3 py-1 font-semibold rounded-md bg-orange-600 text-gray-50">
                    <span>Pending</span>
                  </span>
                </td> */}
              </tr>
              
            </tbody>
        )
      })}
            
          </table>
        </div>
        <Modal title="Update Collection" closable={{'aria-label':'Custom Close Button '}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <CollectionForm handleSubmit={handleUpdate}  value={updatedName} setValue={setUpdatedName}/>
        </Modal>
        
      </div>
     
    </div>
  )
}

export default CreateCollection