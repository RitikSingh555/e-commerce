import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
  
import AdminNav from '../../../components/nav/AdminNav'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'


const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
};
  
const ProductCreate = () => {

    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([])
    const [showSub, setShowSub] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        getCategories().then((c) => setValues({ ...values, categories: c.data }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token).then(res => {
            console.log(res)
            window.alert(`"${res.data.title}" is created`)
            window.location.reload()
        }).catch(error => {
            console.log(error)
            // if(error.response.status === 400) {
            //     toast.error(error.response.data)
            // }
            toast.error(error.response.data.err)
        })
        //
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    };

    const handleCategoryChange = (e) => {
        e.preventDefault()
        console.log('Clicked Catrgory', e.target.value)
        setValues({ ...values, subs: [], category: e.target.value })
        getCategorySubs(e.target.value).then((res) => {
            console.log('Sub Options on Category Click ', res)
            setSubOptions(res.data)
        })
        setShowSub(true)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (<LoadingOutlined className="text-danger h1" />) : (<h4>Create Product</h4>)}
                    <br />

                    {/* {JSON.stringify(values.images)} */}

                    <div className="p-3">
                        <FileUpload values={values} setLoading={setLoading} setValues={setValues} />
                    </div> 

                    <ProductCreateForm 
                        handleChange={handleChange} 
                        handleSubmit={handleSubmit} 
                        values={values}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange} 
                        subOptions={subOptions}
                        showSub={showSub}
                    />
                </div>
            </div>
        </div>  
    )
}

export default ProductCreate