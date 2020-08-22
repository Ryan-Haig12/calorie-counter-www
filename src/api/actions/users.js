const server = require('../server')
const moment = require('moment')

export const getAllUserData = async userId => {
    let allUserData
    
    try {
        allUserData = await server.default.get(`/api/v1/users/allData/${ userId }`)
    } catch(err) {
        console.log('err', err)
    }

    return Promise.resolve(allUserData.data)
}

// filter through all user data and only return calorie and exercise logs in a specific date range
export const getAllUserCalorieLogsViaTimeFrame = async (userId, begin, end) => {
    let allUserData
    
    try {
        allUserData = await server.default.get(`/api/v1/users/allData/${ userId }`)
        console.log('EEE', allUserData.data)

        // filter through calorieLogs
        allUserData.data.calories = allUserData.data.calories.filter(log => {
            if(moment(log.logged_at).unix() > begin && moment(log.logged_at).unix() < end) {
                return true
            } else {
                allUserData.data.totals.caloriesGained -= log.calories
            }
        })

        // filter through exerciseLogs
        allUserData.data.exercise = allUserData.data.exercise.filter(log => {
            if(moment(log.logged_at).unix() > begin && moment(log.logged_at).unix() < end) {
                return true
            } else {
                allUserData.data.totals.caloriesBurnt -= log.calories_burnt
            }
        })

        allUserData.data.totals.netCalories = allUserData.data.totals.caloriesGained + allUserData.data.totals.caloriesBurnt
    } catch(err) {
        console.log('err', err)
    }

    return Promise.resolve(allUserData.data)
}