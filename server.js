const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'website')));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'website', 'login', 'login.html'));
});

app.use((req, res) => {
    res.status(404) //error message
    res.send(`
  <video src = "/videos/CarrieUnderwood.mp4" controls>
  </video>
  `)})

const PORT = process.env.PORT || 8080;
app.listen(PORT, _ => {
    console.log('App deployed at Port 8080');
});