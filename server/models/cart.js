const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: ObjectId,
                ref: 'Product'
            },
            count: Number,
            color: String,
            price: Number
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderdBy: { type: ObjectId, ref: 'User' } // Change it to OrderedBy after completion of project
},
    { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)