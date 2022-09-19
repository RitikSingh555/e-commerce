import React, { useState } from 'react'
import { Card, Tooltip } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useDispatch } from 'react-redux'

import laptop from '../../images/computer/laptop.png'
import { showAverage } from '../../functions/rating'


const { Meta } = Card

const ProductCard = ({ product }) => {
    const { images, title, description, slug, price } = product

    const [tooltip, setTooltip] = useState('Click To Add')

    const dispatch = useDispatch()

    const handleAddToCart = () => {
        
        let cart = []
        if(typeof window !== "undefined") {
            if(localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.push({
                ...product,
                count: 1
            })

            let unique = _.uniqWith(cart, _.isEqual)

            localStorage.setItem('cart', JSON.stringify(unique))
            setTooltip("Added")

            dispatch({
                type: "ADD_TO_CART",
                payload: unique
            })

            dispatch({
                type: "SET_VISIBLE",
                payload: true
            })
        }
    }

    return(
        <>
            { product && product.ratings && product.ratings.length > 0 
                ? showAverage(product) 
                : <div className="text-center pt-1 pb-3">No Ratings Yet</div> 
            }
            <Card 
                cover={
                    <img
                        src={images && images.length ? images[0].url : laptop} 
                        alt=""
                        style={{ height: '150px', objectFit: 'cover' }} 
                        className="p-1"
                    />
                }
                actions = {[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" /><br /> View Product
                    </Link>, 
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined className="text-danger" /><br /> 
                            {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
                        </a>
                    </Tooltip>
                ]}
            >
                <Meta title={`${title} - Rs. ${price}`} description={`${description && description.substring(0, 40)}...`} />
            </Card>
        </>
    )
}


export default ProductCard