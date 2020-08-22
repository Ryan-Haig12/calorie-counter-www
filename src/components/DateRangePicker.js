import React from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

export default ({ startDate, setStartDate, endDate, setEndDate }) => {
    return (
        <div>
            <DatePicker
                selected={ startDate }
                onChange={ setStartDate }
            />

            <DatePicker
                selected={ endDate }
                onChange={ setEndDate }
            />
        </div>
    )
}