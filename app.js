const express= require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todobbb");
const trySchema = new mongoose.Schema({
    name:String
});
const item = mongoose.model("task", trySchema); 
const todobbb = new item({
    name:"create some videos"
});
const todobbb1 = new item({
    name:"learn dsa"
});
const todobbb2 = new item({
    name:"learn react"
});
const todobbb3 = new item({
    name:"take some rest"
});

app.get("/", async function(req, res) {
    try {
        const foundItems = await item.find({});
        res.render("list", {ejes: foundItems});
    } catch (err) {
        console.log(err);
    }
});
app.post("/", async function(req, res) {
    const itemName = req.body.ele1;
    const todo4= new item({
        name:itemName
    });
    todo4.save();
    res.redirect("/");
});
app.post("/delete", async function(req, res) {
    const checked = req.body.checkbox1;
    try {
        await item.findByIdAndDelete(checked);
        console.log("deleted");
        res.redirect("/");
    } catch (err) {
        console.log(err);
        // handle error
    }
});


app.listen("3000",function(){
    console.log("server is running");
});