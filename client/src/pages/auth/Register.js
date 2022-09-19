import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

import { auth } from '../../firebase'


const Register = ({history}) => {

    const [email, setEmail] = useState("")

    const { user } = useSelector((state) => ({...state}))

    useEffect(() => {
        if(user && user.token) {
            history.push('/')
        }
    }, [user, history])

    const handleSubmit = async(e) => {
        e.preventDefault() // Prevent the browser from reloading

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL, // from env file 
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`Email is sent to ${email}. Click the link to complete your registeration.`)

        window.localStorage.setItem('emailForRegisteration', email)
        setEmail("")

    }

    const registerForm = () => <form onSubmit={handleSubmit}>
        <input
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            placeholder="Enter Email-Id"
        />
        <br />
        <button type="submit" className="btn btn-raised">Register</button>
    </form>

    return (

        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register