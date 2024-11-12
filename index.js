//instantiation
//import express
const express = require("express")
const app = express()

//importing mysql
const mysql = require("mysql")

//port number
const PORT = process.env.PORT || 5000;

//connection to mysql
const connection  = mysql.createConnection({
    host: "localhost",
    user: "root",
    passord: "",
    database: "employee",

});

//initialization of connection
connection.connect();


//API
//Get request and response are the parameters
app.get("/api/members", (req, res) =>{
    //create a query
    connection.query("SELECT * FROM userdata",(err, rows, fields)=>{
        //checking errors
        if(err) throw err;
        //response
        //key value pair

        res.json(rows);
    
    })
})

//GET
//API
//Passing the id parameter
//request-> front-end ID
app.get("/api/members/:id", (req, res) => {
    const id=req.params.id; // 60
    connection.query(`SELECT * FROM userdata WHERE id='${id}'`, (err,rows, fields) =>{
        if (err) throw err

        if (rows.length > 0){
            res.json(rows)
        } else {
            res.status(400).json({msg: `${id} id not found!`})
        }
    })
    // res.send(id);
})


//POST--> CREATE
app.use(express.urlencoded({extended: false}))
app.post("/api/members", (req, res)=>{
    const fname= req.body.fname
    const lname=req.body.lname
    const email=req.body.email
    const gender=req.body.gender
    const ip_address=req.body.ip_address

    connection.query(`INSERT INTO userdata (first_name, last_name, email, gender, ip_address) VALUE ('${fname}', '${lname}', ' ${email}', '${gender}', '${ip_address}')`, (err, rows, fields) =>{
        if (err) throw err;
        res.json({msg: `Successfully inserted`});

    })
})

//CRUD
//PUT--> UPDATE
app.use(express.urlencoded({extended: false}))
app.put("/api/members", (req, res)=>{
    const fname= req.body.fname
    const lname=req.body.lname
    const email=req.body.email
    const gender=req.body.gender
    const ip_address=req.body.ip_address
    const id=req.body.id

    connection.query(`UPDATE userdata SET first_name='${fname}', last_name='${lname}', email='${email}', gender='${gender}' WHERE id= '${id}'`, (err, rows, fields) =>{
        if (err) throw err;
        res.json({msg: `Successfully updated`});

    })
})


app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
})
