const lowdb = require('lowdb')

const FileSync = require("lowdb/adapters/FileSync");
// initialize (mock) Database
const adapter = new FileSync("./data/db.json");
const db = lowdb(adapter); 

const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
  
});

// the task 01 in line 9
router.get('/records',(req, res)=> {
  res.send("get all records") 
}) 


router.post('/records',(req, res)=> {
  db.get("records").push(req.body).write()
  console.log(req.body);
  res.send("add all records")
  
})



module.exports = router;
