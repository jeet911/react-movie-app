import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import app, { usersRef } from './firebase/firebase'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'


const signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        mobile: "",
        name: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [OTP, setOTP] = useState("")

    const auth = getAuth(app);
    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);
    }

    const requestOtp = () => {
        setLoading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier).then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            swal({
                text: "OTP Sent",
                icon: "success",
                buttons: false,
                timer: 3000
            });
            setOtpSent(true);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    const verifyOTP = () => {
        try {
            setLoading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();
                swal({
                    text: "Successfully Registered",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                });
                navigate('/login')
                setLoading(false);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const uploadData = async () => {
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(form.password, salt);
        addDoc(usersRef, {
            name: form.name,
            password: hash,
            mobile: form.mobile
        })

    }



    return (
        <div className='w-full  flex flex-col mt-4 items-center'>
            <h1 className='text-xl font-bold text-center'>Signup</h1>
            {
                otpSent ?
                    <>
                        <div className="p-2 w-full md:w-1/3 mt-6">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-300">
                                    OTP
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={OTP}
                                    onChange={(e) => setOTP(e.target.value)}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button onClick={verifyOTP} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                                {loading ? <TailSpin height={25} color='white' /> : "Confirm OTP"}
                            </button>
                        </div>
                    </>

                    :
                    <>
                        <div className="p-2 w-full md:w-1/3 mt-6">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="f_name"
                                    name="f_name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full md:w-1/3">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-300">
                                    Mobile No.
                                </label>
                                <input
                                    type="number"
                                    id="mobile"
                                    name="mobile"
                                    value={form.mobile}
                                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full md:w-1/3">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-300">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button onClick={requestOtp} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                                {loading ? <TailSpin height={25} color='white' /> : "Sign up"}
                            </button>
                        </div>
                    </>}
            <p>Already have an account ? <Link to={"/login"}><span className='text-blue-500'>Login</span></Link></p>

            <div id='recaptcha-container'>

            </div>
        </div>
    )
}

export default signup