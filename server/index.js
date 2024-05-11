import express from 'express';
import db from './datebase/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(express.json());
app.use(bodyParser.json());
// app.use(cors({
//     origin: ['http://localhost:3000'],
//     methods: ['POST', 'GET', 'PUT', 'DELETE'],
//     credentials: true,
// }));
app.use(cors());

// for inserting the Data
app.post('/', (req, res) => {
    const { userName, userEmail, password, city, state, designation } = req.body; 
  
    const insertSql = "INSERT INTO `employee`(`emp_id`, `name`, `email`, `city`, `designation`, `state`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(insertSql, [null, userName, userEmail, city, designation, state, password], (err, result) => {
      if (err) return res.status(500).json({ error: "Error inserting data into employee table" });
      return res.status(200).json({ status: "Success", message: "Data inserted successfully" });
    });
  });
  

// Api for fetching the Data
app.get('/data-show', (req, res) => {
    const Sql = "SELECT * FROM `employee`"; 
    db.query(Sql, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching data from employee table" });
      }
      return res.status(200).json(result);
    });
  });


// api for update
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    db.query('UPDATE employee SET ? WHERE emp_id = ?', [updatedUserData, userId], (error, results) => {
      if (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ error: 'Error updating user data' });
      } else {
        console.log('User data updated successfully:', results);
        res.status(200).json({ message: 'User data updated successfully' });
      }
    });
  });


  // api for delete
  app.delete('/userDelete', (req, res) => {
    const userId = req.body.userId;
    console.log(userId);
  
    db.query('DELETE FROM employee WHERE emp_id = ?', [userId], (error, results) => {
      if (error) {
        console.error('Error deleting user data:', error);
        res.status(500).json({ error: 'Error deleting user data' });
      } else {
        console.log('User data deleted successfully:', results);
        res.status(200).json({ message: 'User data deleted successfully' });
      }
    });
  });
  

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
