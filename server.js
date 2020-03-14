const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/in3-computer-store')))

app.get("*",function(req, res, next) {
  console.log("enter here")
  res.sendFile(path.join(__dirname, 'dist/in3-computer-store/index.html'));
});


app.listen(port, () => {
    console.log('Api started:', `on port ${port}`);
});