//instantiation
//import express API framework
const express = require("express")
const app = express();
const moment = require('moment')
//importing mysql
const mysql = require("mysql")
const cors = require('cors')
//port number
const PORT = process.env.PORT || 5000;

const logger = (req, res, next) =>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()} `)
    next()
}

app.use(logger)
app.use(cors())
app.use(express.json());
//connection to mysql
const connection = mysql.createConnection({
    host: "bgfseaknkaodruejny1c-mysql.services.clever-cloud.com",
    user: "u4rxpwoz2lh3gfx1",
    password: "IxdtsnTVoDXrPhtoYsSS",
    database: "bgfseaknkaodruejny1c",
});

//initilization of connection
connection.connect();


//API - REPORT
//GET request and response are the parameters
app.get("/api/products", (req, res) =>{
    //create a query
    connection.query("SELECT * FROM products",(err, rows, fields)=>{
        //checking errors
        if(err) throw err;
        //response
        //key value pair
        res.json(rows);
    });
});

//API - REPORT - SEARCH
//passing the id parameter
//request - >>> front-end ID
app.get("/api/products/:id",(req, res)=>{
    const id=req.params.id; 
    connection.query(`SELECT * FROM products WHERE id='${id}'`, (err, rows, fields)=>{
        if(err) throw err;

        if(rows.length > 0){
            res.json(rows);
        }else{
            res.status(400).json({msg: `${id} id not found!`})
        }
    })
    //res.send(id);
})


//POST - CREATE
app.use(express.urlencoded({extended: false}))
app.post("/api/products", (req, res)=>{
    const itName = req.body.itName;
    const unPrice = req.body.unPrice;
    const quant = req.body.quant;
    const suplr = req.body.suplr;
    connection.query(`INSERT INTO userdata (itemName, unitPrice, quantity, supplier) VALUES ('${itName}','${unPrice}', '${quant}', '${suplr}')`, (err, rows, fields) =>{
        if(err) throw err;
        res.json({msg: `Successfully inserted`});
    })

})



app.listen(5000, () => {
    console.log(`Server is running in port ${PORT}`);
})
