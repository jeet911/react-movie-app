import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import { appstate } from '../App'


const Header = () => {
    const useAppstate = useContext(appstate)

    return (
        <div className='sticky top-0 z-10 bg-black text-3xl font-bold border-b-2 border-gray-500 flex justify-between items-center p-3 '>
            <Link to={"/"}><span className='text-red-500'>Filmy<span className='text-white'>Verse</span></span></Link>
            {
                useAppstate.login ?
                <Link to={"/addmovie"}><h1 className=' text-lg cursor-pointer'><AddIcon className='mr-2' />Add New</h1></Link>
                :
                <Link to={"/login"}><h1 className=' text-lg cursor-pointer bg-green-500 px-2'>Login</h1></Link>

            }
        </div>
    )
}
export default Header;
