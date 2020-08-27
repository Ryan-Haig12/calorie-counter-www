import React from 'react'
import gravatar from 'gravatar'

export default () => {
    const userData = JSON.parse(localStorage.getItem('cc-userData'))
    const { username, email, gender, age, birthday, createdOn, currentWeight, dailyCalorieIntake, idealWeight } = userData

    const url = gravatar.url(email, {s: '250', r: 'pg', d: '404'})
    return (
        <div style={{ padding: '30px' }} >
            <div>
                <img src={ url } />
                <p>Profile pictures can be changed</p>
                <p>using <a style={{ textDecoration: 'underline' }} href="https://en.gravatar.com/" >Gravatar</a></p>
            </div>

            <div style={{ position: 'absolute', top: '15%', left: '30%', border: '1px solid black', width: '300px', height: '200px' }} >
                <h1>Name: { username }</h1>
                <p>Email: { email }</p>
                <p>Location: No Location Set</p>
                <p>Gender: { gender }</p>
                <p>Member Since: { createdOn }</p>
                <p>Age: { age }</p>
                <p>Birthday: { birthday }</p>
            </div>

            <div style={{ position: 'absolute', top: '15%', left: '60%', border: '1px solid black', width: '300px', height: '200px' }} >
                <p>Current Weight: { currentWeight }</p>
                <p>Daily Calorie Intake: { dailyCalorieIntake }</p>
                <p>idealWeight: { idealWeight }</p>
            </div>
        </div>
    )
}