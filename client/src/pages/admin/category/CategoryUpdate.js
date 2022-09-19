import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
  
import AdminNav from '../../../components/nav/AdminNav'
import { updateCategory, getCategory } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = ({history, match}) => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({...state}))

    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = () => {
        getCategory(match.params.slug).then((c) => setName(c.data.name))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateCategory(match.params.slug, { name }, user.token).then((res) => { // Go through it once more
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is updated`)
            history.push('/admin/category')
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
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Update Category</h4>)}
                    <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} />
                    <br />
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate