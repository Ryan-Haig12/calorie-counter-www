import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, navigate } from '@reach/router'

import server from '../api/server'

export default () => {
    const { register, handleSubmit } = useForm()
    const [ error, setError ] = useState()

    const onSubmit = async data => {
        setError(null)
        let registerData

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!validEmail.test(data.email)) {
            return setError('Email must be valid')
        }

        if(data.password.length < 6) {
            return setError('Password must be at least 6 characters')
        }

        if(data.password.length >= 30) {
            return setError('Password must be smaller than 30 characters')
        }

        try {
            registerData = await server.post('/api/v1/users/create', data)
        } catch(err) {
            console.log(err.response)
            
            if(err.response?.data?.err) {
                setError(err.response.data.err)
            } else {
                setError(err.response?.data)
            }
        }

        if(registerData?.data?.newUser) {
            localStorage.setItem('cc-userJWT', registerData.data.jwt)
            localStorage.setItem('cc-userData', JSON.stringify(registerData.data.newUser))
            navigate('/home')
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

                <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">
                    Username
                </label>
                <div className="flex justify-center p-5" >
                    <input  
                        name="username" type="username" placeholder="username" ref={ register({ required: true }) } 
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

                <label htmlFor="password2" className="block text-sm font-medium leading-5 text-gray-700">
                    Confirm Password
                </label>
                <div className="flex justify-center p-5" >
                    <input  
                        name="password2" type="password" placeholder="confirm password" ref={ register({ required: true }) } 
                        className="appearance-none w-10/12 block px-3 py-2 border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                </div>

                { error && <p className="text-red-800" >{ error }</p> }
                
                <button type="submit" className="border-2 border-purple-800 bg-purple-800 text-white mt-5 p-3 rounded">Submit</button>
                <Link to="/login" className="p-3">Already have a user?</Link>
            </div>
        </form>
    )
}
