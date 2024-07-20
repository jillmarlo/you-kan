const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyparser.json());

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

// *************************
// CRUD for USER
// *************************

// get all data
app.get('/user',(req,res)=>{

    let query1 = 'select * from Users';

    db.query(query1,(err, result) => {
        if (err)
        {
            console.log(err, 'errs');
        }

        if(result.length > 0) 
        {
            res.send({
                message:'all user data',
                data:result
            })
        }
    })

}) ;

// get single data
app.get('/user/:id',(req,res) =>{

    let gID = req.params.id;

    let query1 = `select * from Users where user_id = ${gID}`

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

app.post('/user',(req,res) => {

    console.log(req.body, 'createdata');

    let first_name = req.body.last_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password_hash = req.body.password_hash;

    let query1 = `INSERT INTO Users (first_name, last_name, email, password_hash) 
                    VALUES('${first_name}', '${last_name}', '${email}', '${password_hash}')`;

    db.query(query1, (err, result) => {
        
        if(err) { console.log(err); }
        console.log(result, 'result');
        res.send({
            message: 'data inserted'
        });
    });
});

// Update single data
app.put('/user/:id', (req,res) => {
    
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

// delete single data

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

// *************************
// CRUD for Projects
// *************************

// get all data for a single user
app.get('/project/user/:userId',(req,res)=>{

    const userId = req.params.userId;

    const getProjectsQuery = `
        SELECT p.*
        FROM Projects p
        JOIN Project_Users pu ON p.project_id = pu.project_id
        WHERE pu.user_id = ?`;

    db.query(getProjectsQuery, [userId], (err, result) => {
        if (err) {
            return res.status(500).send('Server eggrror');
        }
        res.json(result);
    });

}) ;

// get single data
app.get('/project/:id',(req, res) => {

    const projectId = req.params.id;
    const userId = req.body.creator_user_id; // Assuming the user ID is passed in the request body

    const checkPermissionQuery = 'SELECT creator_user_id FROM Projects WHERE project_id = ?';
    db.query(checkPermissionQuery, [projectId], (err, result) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        if (result.length === 0) {
            return res.status(404).send('Project not found');
        }
        const project = result[0];
        if (project.creator_user_id !== userId) {
            return res.status(403).send('User does not have permission to view this project');
        }

        // If the user has permission, retrieve the project details
        const getProjectQuery = 'SELECT * FROM Projects WHERE project_id = ?';
        db.query(getProjectQuery, [projectId], (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            if (result.length === 0) {
                return res.status(404).send('Project not found');
            }
            res.json(result[0]);
        });
    });
});

// create data

app.post('/project',(req,res) => {

    console.log(req.body, 'createdata');

    const projectName = req.body.project_name
    const creatorId = req.body.creator_user_id

    const insertProjectQuery = `INSERT INTO Projects (project_name, creator_user_id) 
                    VALUES(?, ?)
                    `;

    db.query(insertProjectQuery, [projectName, creatorId], (err, result) => {
        if (err) {
            return res.status(500).send('Error inserting project');
        }

        const projectId = result.insertId;

         // Associate the project with the user
        const insertUserProjectQuery = `
        INSERT INTO Project_Users (user_id, project_id)
        VALUES (?, ?)
        `;

        db.query(insertUserProjectQuery, [creatorId, projectId], (err) => {
            if (err) {
              return res.status(500).send('Error inserting into Project_Users');
            }
      
            res.status(201).send('Project created and associated with user successfully');
        });
    });
});

// Update single data
app.put('/project/:id', (req,res) => {
    
    console.log(req.body, 'update data');

    const projectId = req.params.id;
    const userId = parseInt(req.body.creator_user_id); // The ID of the user attempting to update the project
    const { project_name } = req.body;

    // Check if the user has permission to update the project
    const checkPermissionQuery = 'SELECT creator_user_id FROM Projects WHERE project_id = ?';
    db.query(checkPermissionQuery, [projectId], (err, result) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        if (result.length === 0) {
            return res.status(404).send('Project not found');
        }
        const project = result[0];
        if (project.creator_user_id !== userId) {
            return res.status(403).send('User does not have permission to update this project');
        }

        // Update the project
        const updateQuery = `
        UPDATE Projects
        SET project_name = ?
        WHERE project_id = ?
        `;
        db.query(updateQuery, [project_name, projectId], (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.send('Project updated successfully');
        })
    })
});

// delete single data 

app.delete('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const userId = req.body.creator_user_id; // The ID of the user attempting to delete the project

    // Check if the user has permission to delete the project
    const checkPermissionQuery = 'SELECT creator_user_id FROM Projects WHERE project_id = ?';
    db.query(checkPermissionQuery, [projectId], (err, result) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        if (result.length === 0) {
            return res.status(404).send('Project not found');
        }
        const project = result[0];
        if (project.creator_user_id !== userId) {
            return res.status(403).send('User does not have permission to delete this project');
        }

        // Delete the project
        const deleteQuery = 'DELETE FROM Projects WHERE project_id = ?';
        db.query(deleteQuery, [projectId], (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.send('Project deleted successfully');
        });
    });
});

// Function to add a user to a project
function addUserToProject(userId, projectId) {
    const query = 'INSERT INTO UserProjects (user_id, project_id) VALUES (?, ?)';
    connection.query(query, [userId, projectId], (error, result) => {
      if (error) {
        console.error('Error inserting relationship:', error);
      } else {
        console.log('Relationship inserted:', result);
      }
    });
  }

app.listen(3000, () => {
    console.log(`Server listening on port 3000...`);
});