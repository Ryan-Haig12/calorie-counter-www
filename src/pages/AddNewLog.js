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
                    timeOfDay: data.timeOfDay,
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

                    { type === 'food' &&
                        <div>
                            <label htmlFor='timeOfDay' className="block text-sm font-medium leading-5 text-gray-700">
                                Meal Type
                            </label>
                            <div className="inline-block relative w-9/12">
                                <select 
                                    name="timeOfDay" type="timeOfDay" placeholder="Meal Type" ref={ register({ required: true }) } 
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                    <option>Snack</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    }

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
