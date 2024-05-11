// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to handle signup form submissions
app.post('/sign-up', (req, res) => {
  const formData = req.body;

  // Read existing data from the JSON file
  let users = [];
  try {
    users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  // Add new user to the array
  users.push(formData);

  // Write updated data back to the JSON file
  try {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    console.log('User data written to JSON file');
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Error writing JSON file:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
