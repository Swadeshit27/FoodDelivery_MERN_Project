const express = require("express");
const router = express.Router();
const Order = require("../model/order")

router.post('/orderData', async (req, res) => {
    let data = req.body.orderData
    await data.splice(0, 0, { OrderDate: req.body.orderDate })
    // console.log("1231242343242354", req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    // console.log(eId)
    if (eId === null) {
        try {
            // console.log(data)
            // console.log("1231242343242354", req.body.email)
            await Order.create({
                email: req.body.email,
                orderData: [data]
            })
            res.status(200).json({ success: true, message: "ordered successful" })
        } catch (error) {
            console.log(error.message)
            res.status(404).send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { orderData: data } })
            res.status(200).json({ success: true, message: "ordered successful" })
        } catch (error) {
            console.log(error.message)
            res.status(404).send("Server Error", error.message)
        }
    }
})


router.post('/myorderData', async (req, res) => { 
   try {
    //    console.log(req.body.email)
       let eId = await Order.findOne({ 'email': req.body.email })
    //    console.log(eId)
       res.status(201).json({ TotalData: eId })
   } catch (error) {
       console.log(error.message)
       res.status(404).send("Server Error", error.message)
   }
})

module.exports = router;