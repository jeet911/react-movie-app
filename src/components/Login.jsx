import { query, where, getDocs } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { usersRef } from './firebase/firebase'
import swal from 'sweetalert'
import { appstate } from '../App'
import bcrypt from 'bcryptjs'


const Login = () => {
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const useAppstate = useContext(appstate);

    const login = async () => {
        setLoading(true);
        try {
            const quer = query(usersRef, where('mobile', '==', form.mobile))
            const querySnap = await getDocs(quer)

            querySnap.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);
                if (isUser) {
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name);
                    swal({
                        title: "Logged In",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    })
                    navigate('/')
                }
                else {
                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    })
                }
            })
        } catch (error) {
            swal({
                title: error.message,
                icon: "success",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);
        setForm({
            password: ""
        });

    }


    return (
        <div className='w-full  flex flex-col mt-4 items-center'>
            <h1 className='text-xl font-bold text-center'>Login</h1>
            <div className="p-2 w-full md:w-1/3 mt-6">
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
                <button onClick={login} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                    {loading ? <TailSpin height={25} color='white' /> : "Login"}
                </button>
            </div>
            <p>Do not have account? <Link to={"/signup"}><span className='text-blue-500'>Sign up</span></Link></p>

        </div>
    )
}

export default Login