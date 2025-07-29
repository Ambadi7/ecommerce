
import axios from 'axios'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchContext from '../../../context/SearchContext'
const Search = () => {
    const [values,setValues] = useContext(SearchContext)
    const navigate = useNavigate()

    //handlesubmit
    const handleSubmit = async (e) =>{
      e.preventDefault()
      try{
        const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`)
        setValues({...values, results :data})
        navigate("/search-items")
      }catch(error){
        console.log(error)
      }
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Search here ....' className='h-20 border-2'
            value={values.keyword} 
            onChange={(e) => setValues({...values,keyword:e.target.value})}
              />
            <button type='submit'>Search</button>
        </form>
    </>
  )
}

export default Search