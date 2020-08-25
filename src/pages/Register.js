import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, navigate } from '@reach/router'

import server from '../api/server'

export default () => {
    const { register, handleSubmit } = useForm()
    const [ userCreds, setUserCreds ] = useState({})
    const [ error, setError ] = useState()
    const [ userHasValidCreds, setUserHasValidCreds ] = useState(false)

    const inputBarClass = "appearance-none w-10/12 block px-3 py-2 border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"

    const onSubmit = async data => {
        setError(null)
        let registerData

        if(!userHasValidCreds) {
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

            setUserHasValidCreds(true)
            setUserCreds(data)

        } else {
            try {
                console.log('here i am', data, userCreds)
                registerData = await server.post('/api/v1/users/create', { ...data, ...userCreds })
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
                navigate('/')
                window.location.reload()
            }
        }
    }

    return (
        <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="border-solid justify-center border-2 border-black w-8/12 p-4 mt-8 text-center shadow-md rounded" >

                {
                    !userHasValidCreds && 
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                            Email
                        </label>
                        <div className="flex justify-center p-5" >
                            <input name="email" placeholder="email" ref={ register({ required: true }) } className={ inputBarClass } />
                        </div>

                        <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">
                            Username
                        </label>
                        <div className="flex justify-center p-5" >
                            <input name="username" type="username" placeholder="username" ref={ register({ required: true }) } className={ inputBarClass } />
                        </div>

                        <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                            Password
                        </label>
                        <div className="flex justify-center p-5" >
                            <input name="password" type="password" placeholder="password" ref={ register({ required: true }) } className={ inputBarClass } />
                        </div>

                        <label htmlFor="password2" className="block text-sm font-medium leading-5 text-gray-700">
                            Confirm Password
                        </label>
                        <div className="flex justify-center p-5" >
                            <input name="password2" type="password" placeholder="confirm password" ref={ register({ required: true }) } className={ inputBarClass } />
                        </div>

                        { error && <p className="text-red-800" >{ error }</p> }
                    </div>
                }

                {
                    userHasValidCreds &&
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium leading-5 text-gray-700">
                            Age
                        </label>
                        <div className="flex justify-center p-5" >
                            <input name="age" type="number" placeholder="age" ref={ register({ required: true }) } className={ inputBarClass } />
                        </div>

                        <label htmlFor="birthday" className="block text-sm font-medium leading-5 text-gray-700">
                            Birthday
                        </label>
                        <div className="flex justify-center p-5" >
                            <input name="birthday" type="date" placeholder="birthday" ref={ register({ required: true }) } className={ inputBarClass } />
                        </div>

                        <label htmlFor="gender" className="block text-sm font-medium leading-5 text-gray-700">
                            Gender
                        </label>
                        <div className="flex justify-center p-5" >
                            <input name="gender" type="text" placeholder="gender" ref={ register({ required: true }) } className={ inputBarClass } />
                        </div>

                        <label htmlFor="currentWeight" className="block text-sm font-medium leading-5 text-gray-700">
                            Current Weight
                        </label>
                        <div className="flex justify-center p-5" >
                            <input name="currentWeight" type="number" placeholder="current weight" ref={ register({ required: true }) } className={ inputBarClass } />
                        </div>

                        <label htmlFor="idealWeight" className="block text-sm font-medium leading-5 text-gray-700">
                            Ideal Weight
                        </label>
                        <div className="flex justify-center p-5" >
                            <input name="idealWeight" type="number" placeholder="ideal weight" ref={ register({ required: true }) } className={ inputBarClass } />
                        </div>

                        <label htmlFor="dailyCalorieIntake" className="block text-sm font-medium leading-5 text-gray-700">
                            Desired Daily Calorie Intake
                        </label>
                        <div className="flex justify-center p-5" >
                            <input name="dailyCalorieIntake" type="number" placeholder="daily calorie intake" ref={ register({ required: true }) } className={ inputBarClass } />
                        </div>
                    </div>
                }
                
                
                <button type="submit" className="border-2 border-purple-800 bg-purple-800 text-white mt-5 p-3 rounded">Submit</button>
                <Link to="/login" className="p-3">Already have a user?</Link>
            </div>
        </form>
    )
}
