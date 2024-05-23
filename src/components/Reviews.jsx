import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef } from './firebase/firebase';
import { db } from './firebase/firebase';
import { addDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { appstate } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Reviews = ({ id, userRated, prevRating }) => {

    const useAppstate = useContext(appstate);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reviewsloading, setReviewsLoading] = useState(false)
    const [form, setForm] = useState("");
    const [newAdded, setNewAdded] = useState(0);


    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            setData([]);
            let quer = query(reviewsRef, where('movieid', '==', id))
            const querRef = await getDocs(quer);

            querRef.forEach((doc) => {
                setData((pre) => [...pre, doc.data()])
            })
            setReviewsLoading(false)
        }
        getData()
    }, [newAdded])


    async function sendReviw() {
        setLoading(true)
        try {
            if (useAppstate.login) {
                await addDoc(reviewsRef, {
                    movieid: id,
                    rating: rating,
                    name: useAppstate.userName,
                    thoughts: form,
                    time: new Date().getTime()
                })

                const docRef = doc(db, "movies", id)
                await updateDoc(docRef, {
                    rating: prevRating + rating,
                    rated: userRated + 1
                })
                setRating(0);
                setForm("");
                setNewAdded(newAdded + 1);
                swal({
                    title: "Review sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                })
            } else (
                navigate('/login')
            )
        } catch (error) {
            swal({
                title: error,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false)
    }

    return (
        <div className='mt-4 border-t-2 border-gray-700'>
            <ReactStars className='' size={25} half={true} value={rating} onChange={(e) => setRating(e)} />
            <input value={form} onChange={(e) => setForm(e.target.value)} type='text' className='w-full p-2 l-gray text-white outline-none' placeholder='Share your thoughts....' />
            <button onClick={sendReviw} className='w-full flex justify-center bg-green-600 p-2 mt-1'>
                {loading ? <TailSpin height={25} color='white' /> : "Share"}
            </button>
            {
                reviewsloading ? <div className='mt-5 flex justify-center'><ThreeDots height={10} color='white' /></div> :
                    <div>
                        {
                            data.map((e, i) => {
                                return (
                                    <div className='p-2 w-full boder-b border-gray-600 mt-2' key={i}>
                                        <div className="flex items-center">
                                            <p className='text-blue-500'>{e.name}</p>
                                            <p className='ml-3 text-xs'>{new Date(e.time).toLocaleString()}</p>
                                        </div>
                                        <ReactStars size={15} half={true} value={e.rating} edit={false} />

                                        <p>{e.thoughts}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Reviews