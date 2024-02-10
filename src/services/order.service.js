const Category = require("../model/category.model");
const Order = require("../model/order.model");


const getOrders = async () => {
    try {
        const result = await Order.aggregate([
            {
                '$unwind': '$products'
            },
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'products.product_id',
                    'foreignField': '_id',
                    'as': 'Product'
                }
            },
            {
                '$lookup': {
                    'from': 'variants',
                    'localField': 'Product.0.variant_id',
                    'foreignField': '_id',
                    'as': 'variant'
                }
            },
            {
                '$unwind': '$variant'
            },
            {
                '$project': {
                    '_id': 1,
                    'product_name': {
                        '$first': '$Product.name'
                    },
                    'description': {
                        '$first': '$Product.description'
                    },
                    'qty': '$products.quantity',
                    'price': '$variant.attributes.Price'
                }
            },
            {
                '$group': {
                    '_id': '$_id',
                    'products': {
                        '$push': {
                            'product_name': '$product_name',
                            'description': '$description',
                            'qty': '$qty',
                            'price': '$price'
                        }
                    }
                }
            }
        ])
        console.log('Aggregation Result:', result);
        return result
    } catch (error) {
        throw new Error('Error in getOrders aggregation: ' + error.message);
    }

}

module.exports = {
    getOrders
}