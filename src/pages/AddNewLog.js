import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { navigate } from '@reach/router'

import server from '../api/server'

const AddNewLog = props => {
    const { register, handleSubmit } = useForm()
    const [ error, setError ] = useState()

    // will be food or exercise
    // if it's null, return the user to the dashboard
    const type = props.location.state.type
    if(!type) return navigate('/')

    const userData = JSON.parse(localStorage.getItem('cc-userData'))
    const userId = userData.id
    
    const onSubmit = async data => {
        setError(null)
        let newLogData

        //console.log('data', data, userId)
        //console.log(data[type])

        if(type === 'exercise') {
            try {
                newLogData = await server.post('/api/v1/exercise/createLog', {
                    userId,
                    activity: data[type],
                    calories_burnt: data.calories
                })
                return navigate('/')
            } catch(err) {
                console.log('error here', err)
                setError(err.response?.data)
            } 
        }

        if(type === 'food') {
            try {
                newLogData = await server.post('/api/v1/calories/createLog', {
                    userId,
                    food: data[type],
                    calories: data.calories
                })
                return navigate('/')
            } catch(err) {
                console.log('error here', err)
                setError(err.response?.data)
            }
        }
    }

    return (
        <div>
            <form className="flex justify-center" onSubmit={ handleSubmit(onSubmit) }>
                <div className="border-solid justify-center border-2 border-black w-8/12 p-4 mt-8 text-center shadow-md rounded" >
                    <label htmlFor={ type } className="block text-sm font-medium leading-5 text-gray-700">
                        { type.charAt(0).toUpperCase() + type.slice(1) }
                    </label>
                    <div className="flex justify-center p-5" >
                        <input 
                            name={ type } placeholder={ type } ref={ register({ required: true }) }
                            className="appearance-none w-10/12 block px-3 py-2 border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                    </div>

                    <label htmlFor='calories' className="block text-sm font-medium leading-5 text-gray-700">
                        Calories { type === 'exercise' && 'Burnt ' }
                    </label>
                    <div className="flex justify-center p-5" >
                        <input  
                            name="calories" type="calories" placeholder="calories" ref={ register({ required: true }) } 
                            className="appearance-none w-10/12 block px-3 py-2 border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        />
                    </div>

                    { error && <p className="text-red-800" >{ error }</p> }
                    
                    <button type="submit" className="border-2 border-purple-800 bg-purple-800 text-white mt-5 p-3 rounded">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewLog
