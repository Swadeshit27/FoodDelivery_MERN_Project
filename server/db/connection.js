const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017/FoodUserData";
const client = new MongoClient(uri);

async function run() {
    try { 
        await mongoose.connect(uri)
        // await client.connect()
        console.log("connected to database")
        const db = client.db('FoodUserData');
        const FoodItems = db.collection('FoodItems');
        const Foodcatagory = db.collection('FoodCatagory');
        global.foodItems= await FoodItems.find().toArray(function (err, e) {
                if (err) console.log(err);
                else console.log(e)
            })
        global.foodcatagory = await Foodcatagory.find().toArray(function (err, e) {
                if (err) console.log(err);
                else console.log(e)
        })
        
    } finally {
        // Close the database connection when finished or an error occurs
        await client.close();
    }
}
run().catch(console.error);     