//instantiation
//import express API framework
const express = require("express")
const app = express();
const moment = require('moment')
//importing mysql
const mysql = require("mysql")
//port number
const PORT = process.env.PORT || 5000;

const logger = (req, res, next) =>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()} `)
    next()
}

app.use(logger)
//connection to mysql
const connection = mysql.createConnection({
    host: "bxiq4xdmaxjhcdjtt2cp-mysql.services.clever-cloud.com",
    user: "upfx9ynfvxjledci",
    password: "WvdbxAOwijojuZDMK2Xz",
    database: "bxiq4xdmaxjhcdjtt2cp",
});

//initilization of connection
connection.connect();


//API - REPORT
//GET request and response are the parameters
app.get("/api/products", (req, res) =>{
    //create a query
    connection.query("SELECT * FROM product_info",(err, rows, fields)=>{
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
    connection.query(`SELECT * FROM product_info WHERE id='${id}'`, (err, rows, fields)=>{
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
    const itname = req.body.itname;
    const unprice = req.body.unprice;
    const quant = req.body.quant;
    const supl = req.body.supl;
    connection.query(`INSERT INTO product_info (itemNAME, unitPRICE, quantity, supplier) VALUES ('${fname}','${lname}', '${email}', '${gender}')`, (err, rows, fields) =>{
        if(err) throw err;
        res.json({msg: `Successfully inserted`});
    })

})

app.listen(5000, () => {
    console.log(`Server is running in port ${PORT}`);
})
