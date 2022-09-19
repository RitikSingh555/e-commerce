import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'

import UserNav from '../../components/nav/UserNav'
import { getWishlist, removeWishlist } from '../../functions/user'

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([])
    const { user } = useSelector((state) => ({ ...state}))
    
    useEffect(() => {
        loadWishlist()
    }, [])

    const loadWishlist = () => 
        getWishlist(user.token).then((res) => {
            setWishlist(res.data.wishlist)
        }
    )

    const handleRemove = (productId) => 
        removeWishlist(productId, user.token).then((res) => {
            loadWishlist()
        }
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col-md-10">
                    <h4>Wishlist</h4>
                    {wishlist.map((p) => (
                        <div key={p._id} className="alert alert-secondary">
                            <Link to={`/product/${p.slug}`}>{p.title}</Link>
                            <span 
                                onClick={() => handleRemove(p._id)}
                                className="btn btn-sm float-right"    
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist