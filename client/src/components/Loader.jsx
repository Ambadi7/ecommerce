

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState , useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';



const Loader = ({path = "login"}) => {
    const [count,setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()

    console.log(count)
    useEffect (()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=>--prevValue)
        },1000)

        count===0 && navigate(`${path}`,{
            state:location.pathname
        }) 
        return () =>{clearInterval(interval)}

    },[count,path,navigate,location])
  return  (
    <div className='flex justify-center items-center h-screen gap-3'>
        <h1>Redirecting in {count} seconds</h1>
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    </div>
    
  )
}

export default Loader