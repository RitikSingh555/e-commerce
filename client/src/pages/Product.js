import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getProduct, productStar } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import { getRelated } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'

const Product = ({ match }) => {
    const [product, setProduct] = useState({})
    const [star, setStar] = useState(0)
    const [related, setRelated] = useState([])

    const { user } = useSelector((state) => ({ ...state }))

    const { slug } = match.params

    useEffect(() => {
        loadSingleProduct()
    }, [slug])

    useEffect(() => {
        if(product.ratings && user) {
            let existingRatingProduct = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString())
            existingRatingProduct && setStar(existingRatingProduct.star)
        }
    }, []) // Temporary Change che [] => Original to kai j nathi

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data)
            getRelated(res.data._id).then((res) => setRelated(res.data))
        })
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating)
        productStar(name, newRating, user.token).then((res) => {
            loadSingleProduct()
        })
    }

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct product={product} onStarClick={onStarClick} star={star} />
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                </div>
            </div>
            <div className="row pb-5">
                {related.length ? 
                    related.map((r) => <div key={r.id}>
                        <ProductCard product={r} className="col-md-4" />
                    </div>) : 
                    <div className="text-center col">No Products Found</div>}
            </div>
        </div>
    )
}

export default Product