import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, navigate } from '@reach/router'

import server from '../api/server'

export default () => {
    const { register, handleSubmit } = useForm()
    const [ error, setError ] = useState()

    const onSubmit = async data => {
        setError(null)
        let loginData

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!validEmail.test(data.email)) {
            return setError('Email must be valid')
        }

        if(data.password.length < 6) {
            return setError('Password must be at least 6 characters')
        }

        try {
            loginData = await server.post('/api/v1/auth', data)
        } catch(err) {
            console.log(err)
            setError(err.response?.data)
        } 
        
        if(loginData?.data?.error) {
            setError(loginData.data.error)
        }

        if(loginData?.data?.jwt) {
            localStorage.setItem('cc-userJWT', loginData.data.jwt)
            localStorage.setItem('cc-userData', JSON.stringify(loginData.data.user))
            navigate('/')
            window.location.reload()
        }
    }
    
    return (
        <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="border-solid justify-center border-2 border-black w-8/12 p-4 mt-8 text-center shadow-md rounded" >
                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                    Email
                </label>
                <div className="flex justify-center p-5" >
                    <input 
                        name="email" placeholder="email" ref={ register({ required: true }) }
                        className="appearance-none w-10/12 block px-3 py-2 border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                </div>

                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                    Password
                </label>
                <div className="flex justify-center p-5" >
                    <input  
                        name="password" type="password" placeholder="password" ref={ register({ required: true }) } 
                        className="appearance-none w-10/12 block px-3 py-2 border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                </div>

                { error && <p className="text-red-800" >{ error }</p> }
                
                <button type="submit" className="border-2 border-purple-800 bg-purple-800 text-white mt-5 p-3 rounded">Submit</button>
                <Link to="/register" className="p-3">Need to Register?</Link>
            </div>
        </form>
    )
}
