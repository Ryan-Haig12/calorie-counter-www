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

        // filter through calorieLogs
        allUserData.data.calories = allUserData.data.calories.filter(log => {
            return moment(log.logged_at).unix() > begin && moment(log.logged_at).unix() < end
        })

        // filter through exerciseLogs
        allUserData.data.exercise = allUserData.data.exercise.filter(log => {
            return moment(log.logged_at).unix() > begin && moment(log.logged_at).unix() < end
        })
    } catch(err) {
        console.log('err', err)
    }

    return Promise.resolve(allUserData.data)
}