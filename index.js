const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());

const SELECT_ALL_TEAMS_QUERY = 'show tables';

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'testDB',
  insecureAuth : true
});

connection.connect(err => {
  if (err){
    console.log(err);
    return err;
  }else {
    console.log('Connected!!');
  }
});


app.get('/', (req,res) => {
  connection.query(SELECT_ALL_TEAMS_QUERY, (err, results) => {
    if(err){
      res.send(err);
    }else{
      return res.json({
        data : results
      });
    }
  });
});

app.get('/players', (req,res) => {
  const {team} = req.query;
  connection.query(`select * from ${team}`, (err, results) => {
    if(err){
      res.send(err);
    }else{
      return res.json({
        data : results
      });
    }
  });
});

app.get('/players/add', (req,res) =>{
  const {team, id, firstName, lastName, num, level} = req.query;
  const INSERT_PLAYER_QUERY = `INSERT INTO `+team+` (playerID, firstName, lastName, num, level) values (${id}, '${firstName}', '${lastName}', ${num}, ${level})`;
  connection.query(INSERT_PLAYER_QUERY, (err, results) => {
    if(err){
      return res.send(err);
    }else{
      return res.send('succesfully added player');
    }
  });
});

app.listen(4000, () => {
  console.log('Server listening on port 4000')
});
