const express = require("express");
const router = express.Router();

router.get("/foodItem", (req, res) => {
    try {
        const { foodItems, foodcatagory } = global; 
        res.status(201).send({foodItems, foodcatagory})
    } catch (error) {
        console.log(error);
        res.status(404).send("Server Error");
    }
})

module.exports = router;