import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
  
import AdminNav from '../../../components/nav/AdminNav'
import { getCategories } from '../../../functions/category'
import { updateSub, getSub } from '../../../functions/sub'
import CategoryForm from '../../../components/forms/CategoryForm'

const SubUpdate = ({ match, history }) => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const [parent, setParent] = useState('')

    const { user } = useSelector((state) => ({...state}))

    useEffect(() => {
        loadCategories()
        loadSub()
    }, [])

    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data))
    }

    const loadSub = () => {
        getSub(match.params.slug).then((s) => {
            setName(s.data.name)
            setParent(s.data.parent)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateSub(match.params.slug, { name, parent }, user.token).then((res) => { // Go through it once more
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is updated`)
            history.push('/admin/sub')
        }).catch(error => {
            setLoading(false)
            if(error.response.status === 400) {
                toast.error(error.response.data)
            }
            
        })
    } 


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">

                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Update Sub Category</h4>)}

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select name="category" className="form-control" onChange={e => setParent(e.target.value)}>
                            <option>Please Select Category</option>
                            {categories.length > 0 && categories.map((c) => <option key={c._id} value={c._id} selected={c._id === parent}>
                                {c.name}
                            </option>)}
                        </select>
                    </div>

                    <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} />

                    <br />

                </div>
            </div>
        </div>
    )
}

export default SubUpdate