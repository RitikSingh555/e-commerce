import React, { useState } from 'react'
import { toast } from 'react-toastify'

import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'

const Password = () => {

    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await auth.currentUser.updatePassword(password).then(() => {
            setLoading(false)
            toast.success("Password Updated")
        }).catch((error) => {
            setLoading(false)
            toast.error(error.message)
        })
    }

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>New Password</label>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter New Password"
                    value={password}
                    disabled={loading}
                />
                <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>Submit</button>
            </div>
        </form>
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Password Update</h4>)}
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}

export default Password