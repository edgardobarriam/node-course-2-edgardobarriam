const path = require('path');
const express = require('express')
const PUBLIC_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000

var app = express();
app.use(express.static(PUBLIC_PATH));

app.listen(PORT, () => {
  console.log(`Server is running on port ${port}`);
});