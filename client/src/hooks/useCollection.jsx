import { useEffect , useState } from "react";
import axios from "axios";

export default function useCollection  () {
    const [collections ,setCollections] = useState([])

    const getAllCollection = async () =>{
        try{
            const {data} = await axios.get("/api/v1/collection/get-allcollection")
            setCollections(data?.collection)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(
        () =>{getAllCollection()} ,
        []
    )
  return (
    collections
  )
}

