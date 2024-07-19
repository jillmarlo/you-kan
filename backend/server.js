const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// Load environment variables from .env file
require('dotenv').config();

// Database connection

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// check database connection

db.connect(err=>{
    if (err) {console.log(err);}
    console.log('database connected ...');
});

// get all data
app.get('/project',(req,res)=>{

    let query1 = 'select * from Projects';

    db.query(query1,(err, result) => {
        if (err)
        {
            console.log(err, 'errs');
        }

        if(result.length > 0) 
        {
            res.send({
                message:'all project data',
                data:result
            })
        }
    })

}) ;

// get single data
app.get('/project/:id',(req,res) =>{

    let gID = req.params.id;

    let query1 = `select * from Projects where project_id = ${gID}`

    db.query(query1,(err,result)=>{

        if(err) {console.log(err);}

        if( result.length > 0 ) {

            res.send({
                message:'get single data',
                data:result
            });
        }
        else 
        {
            res.send({
                message:'data not found'
            });
        }
    })

})

// create data

app.post('/project',(req,res) => {

    console.log(req.body, 'createdata');

    let p_name = req.body.project_name
    let creator_id = req.body.creator_user_id

    let query1 = `INSERT INTO Projects (project_name, creator_user_id) 
                    VALUES('${p_name}', '${creator_id}')`;

    db.query(query1, (err, result) => {
        
        if(err) { console.log(err); }
        console.log(result, 'result');
        res.send({
            message: 'data inserted'
        });
    });
});

// Update single data **************************NEEDS UPDATE
app.put('/project/:id', (req,res) => {
    
    console.log(req.body, 'update data');

    let user_id = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password_hash = req.body.password_hash;

    let query1 = `UPDATE Users SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', password_hash = '${password_hash}'
                    WHERE user_id = '${user_id}'`;

    db.query(query1, (err, result) => {

        if(err) {
            console.log(err);
        }
        res.send({
            message: 'data updated'
        });
    });
});

// delete single data **************************NEEDS UPDATE

app.delete('/user/:id', (req,res) =>{

    console.log(req.body, 'delete data');

    let user_id = req.params.id;

    let query1 = `DELETE FROM Users WHERE user_id = '${user_id}'`;
    db.query(query1, (err, result) => {
        if(err) {console.log(err);}

        res.send(
            {
                message:'data deleted'
            }
        )
    })
})


app.listen(3000, () => {
    console.log(`Server listening on port 3000...`);
});