import React, { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

const CreateCollection = () => {
  const [collection , setCollection] = useState([])

  const getAllCollection = () =>{
    try{

    }catch(error){
      console.log(error)
      toast.error(`Something went wrong getting all collection ${error}`)
    }
  }
  return (
    <div>CreateCollection</div>
  )
}

export default CreateCollection