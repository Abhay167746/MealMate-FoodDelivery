import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from "stripe"

const stripe = new Stripe (process.env.STRIPE_SECRET_KEY)

//placing user order for frontend


const placeOrder = async (req , res) =>{

  const frontend_url= "http://localhost:5174";
  try {
    const newOrder = new orderModel({
      userId:req.body.userId,
      items:req.body.items,
      amount:req.body.amount,
      address:req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

    //neccessary for stripe payment

    const line_items = req.body.items.map((item)=>({
       price_data : {
        currency:"inr",
        product_data:{
          name:item.name
        },
        // unit_amount:item.price*100*80

        unit_amount: Math.round(item.price * 100 *80)

      },
      quantity:item.quantity

    }))

    line_items.push({
      price_data:{
        currency:"inr",
        product_data:{
          name:"Delivery Charge"
        },
        unit_amount:2*100*80
      }, 
      quantity:1
    })

    const session = await stripe.checkout.sessions.create({
      line_items:line_items,
      mode:'payment',
      success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })

    res.json({success:true, session_url:session.url})

  }
      catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})

  }

}

const verifyOrder= async (req, res)=>{ 
  const {orderId,success}= req.body;
  try{
    if(success == "true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true, message:"Paid"})
    } 
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false, message:"Not Paid"})
    }
  }catch(error){
    console.log(error);
    res.json({success:false , message:"Error"})
  }

}

//user order for frontend

const userOrders = async (req, res)=>{
  try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true, data:orders})
    
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
    
  }
}

//listing orders for admin panel
const listOrders= async(req,res)=>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true, data:orders})
    
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}

//api for updating order status
const updateStatus = async (req, res)=>{
  

  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true, message:"status Updated"})
    
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})

  }

}

export {placeOrder, verifyOrder ,userOrders, listOrders, updateStatus}














// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const placeOrder = async (req, res) => {
//   const frontend_url = "http://localhost:5173";

//   try {
//     const { userId, items, amount, address } = req.body;

//     if (!userId || !items || !amount || !address) {
//       return res.status(400).json({ success: false, message: "Missing order data" });
//     }

//     // Save order
//     const newOrder = new orderModel({
//       userId,
//       items,
//       amount,
//       address
//     });

//     await newOrder.save();

//     // Clear user's cart
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     // Stripe line items
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name
//         },
//         unit_amount: Math.round(item.price * 100), // price in paise
//       },
//       quantity: item.quantity
//     }));

//     // Add fixed delivery charge (₹160)
//     line_items.push({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: "Delivery Charge"
//         },
//         unit_amount: 16000 // 160 * 100 (paise)
//       },
//       quantity: 1
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items: line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
//     });

//     res.json({ success: true, session_url: session.url });

//   // } catch (error) {
//   //   console.error("Stripe/Order Error:", error.message);
//   //   res.status(500).json({ success: false, message: "Server error, please try again" });
//   // }

//   }catch (error) {
//   console.error("Error in placeOrder:", error.message);
//   res.status(500).json({ success: false, message: error.message });
// }

// };

// export { placeOrder };


