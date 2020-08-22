import React from 'react'
import moment from 'moment'

export default ({ type, logs }) => {
    let calories = 'Calories'
    if(type === 'Food') calories += ' Gained'
    if(type === 'Activity') calories += ' Burnt'

    const mapLogs = () => {
        if(!logs) return []

        return logs.map(log => {
            if(type === 'Food') {
                return (
                    <tr key={ log.logid }>
                        <td className="border px-4 py-2">{ log.food }</td>
                        <td className="border px-4 py-2">{ log.time_of_day }</td>
                        <td className="border px-4 py-2">{ log.calories }</td>
                        <td className="border px-4 py-2">{ moment(log.logged_at).format('L LT') }</td>
                    </tr>
                )
            } else if (type === 'Activity') {
                return (
                    <tr key={ log.logid } >
                        <td className="border px-4 py-2">{ log.activity }</td>
                        <td className="border px-4 py-2">{ log.calories_burnt }</td>
                        <td className="border px-4 py-2">{ moment(log.logged_at).format('L LT') }</td>
                    </tr>
                )
            }
        })   
    }

    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">{ type }</th>
                    { type === 'Food' && <th className="px-4 py-2">Meal</th> }
                    <th className="px-4 py-2">{ calories }</th>
                    <th className="px-4 py-2">Logged At</th>
                </tr>
            </thead>
            <tbody>
                { mapLogs() }
            </tbody>
        </table>
    )
}