const {
    Order,
    ProductCart
} = require('../models/Order')



exports.getOrderId = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No Order Found "
                })
            }
            req.order = order
            next()
        })
}


// create 

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile

    const order = new Order(req.body.order)

    order.save((err, order) => {
        if (err) {
            return res.status(400).json({
                error: "Order Fiald Save in BD "
            })
        }
        return res.json(order)
    })
}


// Get All order
exports.getAllOrders = (req, res) => {
    Order.find().populate('user', "-id name").exec((err, order) => {
        if (err) {
            return res.status(400).json({
                error: "No Order Found in DB"
            })
        }
        return res.json(order)
    })
}

//  

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
}



exports.updateStatus = (req, res) => {

    Order.update({
            _id: req.body.orederId
        }, {
            $set: {
                status: req.body.status
            }
        },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "Can not update Order Status"
                })
            }
            return res.json(order)
        }
    )
}