import React from 'react'
import { useState } from 'react';
import ReactStars from 'react-stars';
import { useEffect} from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import { moviesRef } from './firebase/firebase';
import { Link } from 'react-router-dom';
import './card.css'

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const docSnap = await getDocs(moviesRef);
            docSnap.forEach((docu)=>{
                setData((prev)=>[...prev,{...(docu.data()),id:docu.id}])
            })
            setLoading(false);

        }
        getData();
    },[])

    return (
        <div className='mt-2 flex flex-wrap px-3 '>
            {   
                loading ? <div className='w-full flex justify-center h-96 items-center'><ThreeDots color='white' /></div> :
                data.map((e, i) => {
                    return (
                        <>
                        <Link to={`/detail/${e.id}`}><div key={i} className='p-2 font-medium card hover:-translate-y-3 transition-all duration-500 cursor-pointer m-2 mb-4'>
                            <img className='card-img' src={e.image} alt="" />
                            <h1>Name: {e.title}</h1>
                            <h1 className='flex items-center'>Rating:
                                <ReactStars className='ml-1' size={20} half={true} value={e.rating/e.rated} edit={false} />
                            </h1>
                            <h1>Year: {e.year}</h1>
                        </div>
                        </Link>
                        </>
                    )
                })}

        </div>
    )
}

export default Cards














// import React, { useEffect, useState } from "react";
// import { Audio, ThreeDots } from "react-loader-spinner";
// import ReactStars from "react-stars";
// import {getDocs} from 'firebase/firestore'
// import {moviesRef} from '../firebase/firebase'
// import { Link } from "react-router-dom";

// const Cards = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function getData() {
//       setLoading(true);
//       const _data = await getDocs(moviesRef);
//       _data.forEach((doc) => {
//         setData((prv) => [...prv, {...(doc.data()), id: doc.id}])
//       })
//       setLoading(false);
//     }
//     getData();
//   },[])

//   return (
//     <div className="flex flex-wrap justify-between px-3 mt-2">
//     {loading ? <div className="w-full flex justify-center items-center h-96"><ThreeDots height={40} color="white" /></div> :
//       data.map((e, i) => {
//         return (
//           <Link to={`/detail/${e.id}`}><div key={i} className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500">
//             <img className="h-60 md:h-72" src={e.image} />
//             <h1>
//               {e.title}
//             </h1>
//             <h1 className="flex items-center">
//               <span className="text-gray-500 mr-1">Rating:</span>
//               <ReactStars
//                 size={20}
//                 half={true}
//                 value={e.rating/e.rated}
//                 edit={false}
//               />
//             </h1>
//             <h1>
//               <span className="text-gray-500">Year:</span> {e.year}
//             </h1>
//           </div></Link>
//         );
//       })
//     }
//     </div>
//   );
// };

// export default Cards;