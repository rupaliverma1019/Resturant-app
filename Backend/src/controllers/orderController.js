import { Order } from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const placeOrder = async (req, res) => {
    try {
        const { id } = req.user;
        const { address } = req.body;

        if (!address) {
            return res.status(400).json({
                message: "Delivery address is required",
                success: false
            });
        }

        const cart = await Cart.findOne({ user: id }).populate("items.menuItem");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty",
                success: false
            });
        }

        // ✅ FIXED reduce function
        const totalAmount = cart.items.reduce(
            (sum, item) => sum + item.menuItem.price * item.quantity,
            0
        );

        const newOrder = await Order.create({
            user: id,
            items: cart.items.map((i) => ({
                menuItem: i.menuItem._id,
                quantity: i.quantity
            })),
            address,
            totalAmount
        });

        // ✅ Clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            order: newOrder
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const getAllOrders = async(req , res) =>{
    try {
     const orders = await Order.find().populate("user").sort({createdAt : -1})
     res.status(200).json(orders)
    } catch (error) {
           console.log(error);
        return res.json({message: "Internal Server Error " , success : false})
    }
}

export const updateOrderStatus = async(req , res) =>{
    try {
        const {orderId} = req.param;
        const {status} = req.body;
        const order = await Order.findById(orderId)
        if(!order) 
            return res.status(400).json({message : "order not find"})
        order.status=status
        await order.save()
        res.json({message : "Order Status Updated " , success : true})
    } catch (error) {
             console.log(error);
        return res.json({message: "Internal Server Error " , success : false})
    }
}




