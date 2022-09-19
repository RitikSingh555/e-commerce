import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
  
import AdminNav from '../../../components/nav/AdminNav'
import { getProduct, updateProduct } from '../../../functions/product'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

const initialState = {
    title: "",
    description: "",
    price: "",
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
  
const ProductUpdate = ({ match, history }) => {

    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([])
    const [categories, setCategories] = useState([])
    const [arrayOfSubs, setArrayOfSubs] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    const { slug } = match.params

    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            // console.log(p)
            setValues({ ...values, ...p.data })
            getCategorySubs(p.data.category._id).then((res) => {
                setSubOptions(res.data)
            })
            let arr = []
            p.data.subs.map((s) => {
                arr.push(s._id)
            })
            setArrayOfSubs((prev) => arr)
        })
    }

    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        values.subs = arrayOfSubs
        values.category = selectedCategory ? selectedCategory : values.category

        updateProduct(slug, values, user.token).then((res) => {
            setLoading(false)
            toast.success(`"${res.data.title}" is updated`)
            history.push('/admin/products')
        }).catch((error) => {
            toast.error(error.response.data.err)
        })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleCategoryChange = (e) => {
        e.preventDefault()
        console.log('Clicked Catrgory', e.target.value)
        setValues({ ...values, subs: [] })
        setSelectedCategory(e.target.value)
        getCategorySubs(e.target.value).then((res) => {
            console.log('Sub Options on Category Click ', res)
            setSubOptions(res.data)
        })
        if(values.category._id === e.target.value) {
            loadProduct()
        }
        setArrayOfSubs([])
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                {loading ? (<LoadingOutlined className="text-danger h1" />) : (<h4>Update Product</h4>)}

                    <div className="p-3">
                        <FileUpload values={values} setLoading={setLoading} setValues={setValues} />
                    </div> 
                    <br />

                    <ProductUpdateForm 
                        handleChange={handleChange} 
                        handleSubmit={handleSubmit} 
                        values={values}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}
                    />
                    <br />
                </div>
            </div>
        </div>  
    )
}

export default ProductUpdate