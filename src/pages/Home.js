import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import moment from 'moment'

import CalorieTable from '../components/CalorieTable'
import DateRangePicker from '../components/DateRangePicker'
import { getAllUserCalorieLogsViaTimeFrame } from '../api/actions/users'

const Home = () => {
    const now = new Date()
    const [ allUserData, setAllUserData ] = useState()
    const [ startDate, setStartDate ] = useState(now.getTime() - 604800000)
    const [ endDate, setEndDate ] = useState(Date.now())

    // ensure user is logged in, if not redirect to the login page
    const userData = JSON.parse(localStorage.getItem('cc-userData'))
    if(!userData) {
        navigate('/login')
        window.location.reload()
    }

    // get the user's calorie/exercise logs
    const getUserData = async () => {
        const allUserData = await getAllUserCalorieLogsViaTimeFrame(userData?.id, moment(startDate).unix(), moment(endDate).unix())
        setAllUserData(allUserData)
    }

    useEffect(() => {
        getUserData()
    }, [ startDate, endDate ])

    return (
        <div>
            <h1 className="text-xl" >Welcome { userData?.username }!</h1>

            <div className="grid grid-cols-2 gap-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={ () => navigate('/log', { state: { type: 'food' } }) }
                >Add New Food Log</button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={ () => navigate('/log', { state: { type: 'exercise' } }) }
                >Add New Exercise Log</button>
            </div>

            <div className="rounded border border-gray-500 p-4 m-4 text-center flex-col">

                <DateRangePicker
                    startDate={ startDate }
                    setStartDate={ setStartDate }
                    endDate={ endDate }
                    setEndDate={ setEndDate }
                />

                <div className="rounded border border-gray-500 p-4 m-4">
                    <div className="flex justify-center" >
                        <CalorieTable type="Food" logs={ allUserData?.calories } />
                    </div>
                </div>

                <div className="rounded border border-gray-500 p-4 m-4">
                    <div className="flex justify-center" >
                        <CalorieTable type="Activity" logs={ allUserData?.exercise } />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 m-4">
                    <div><p className="text-xl font-bold">Calories Gained:</p><h2 className="text-2xl text-red-700 font-bold" >{ allUserData?.totals?.caloriesGained }</h2></div>
                    <div><p className="text-xl font-bold">Calories Burnt:</p><h2 className="text-2xl text-green-700 font-bold" >{ allUserData?.totals?.caloriesBurnt }</h2></div>
                    <div><p className="text-xl font-bold">Net Calories:</p><h2 className="text-2xl text-blue-700 font-bold" >{ allUserData?.totals?.netCalories }</h2></div>
                </div>
            </div>
        </div>
    )
}

export default Home
