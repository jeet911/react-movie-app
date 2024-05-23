import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase/firebase'
import Reviews from './Reviews'

const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        title:"",
        year:"",
        image:"",
        description:"",
        rated: 0,
        rating:0
    });
    useEffect(() => {
        async function getData() {
            const docRef = doc(db, "movies", id);
            const docSnap = await getDoc(docRef);
            setData((docSnap.data()))
            console.log(docSnap.data());
        }
        getData()
    }, [])

    return (
        <div className='p-4 mt-4 flex justify-center w-full'>
            <img className='h-96 sticky left-0 top-20' src={data.image}></img>
            <div className='w-1/2 ml-3'>
                <h1 className=' text-3xl font-bold text-gray-300'>{data.title}<span className='text-lg'> ({data.year})</span></h1>
                <ReactStars className='ml-1' size={20} half={true} value={data.rating/data.rated} edit={false} />
                <p className='mt-2'>
                    {data.description}
                </p>
                <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
            </div>
        </div>
    )
}

export default Detail