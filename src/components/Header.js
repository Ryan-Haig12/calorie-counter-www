import React from 'react'
import { navigate } from '@reach/router'
import gravatar from 'gravatar'

export default ({ match }) => {
    const userData = JSON.parse(localStorage.getItem('cc-userData'))
    let url = gravatar.url(userData?.email, { s: '50', r: 'pg', d: '404' })
    const defaultImage = gravatar.url('http://www.gravatar.com/avatar', { s: '50', r: 'pg' })

    const logout = () => {
        localStorage.removeItem('cc-userJWT')
        localStorage.removeItem('cc-userData')
        navigate('/login')
        window.location.reload()
    }

    return (
        <div className="flex justify-between border-solid border-b-4 border-black bg-red-600 p-3">
            <h1 className="text-4xl uppercase" onClick={ () => navigate('/') } style={{ cursor: 'pointer' }} >Calorie Counter</h1>
    
            { userData && 
                <div onClick={ () => navigate('/profile') } style={{ cursor: 'pointer' }} >
                    <div style={{ display: 'inline-block', paddingLeft: '50px', textAlign: 'left', paddingRight: '20px' }}>
                        <p style={{ display: 'inline-block', paddingRight: '5px' }}>{ userData?.username }</p>
                        <img style={{ display: 'inline-block', borderRadius: '50%'  }} src={ url } /> 
                    </div>

                    { match && <button onClick={ () => logout() }  className="text-white p-2 rounded ml-100" >Logout</button> }
                </div>
            }
        </div>
    )
}
