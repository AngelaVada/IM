require("dotenv").config();
const express = require("express");
const app = express();
const { createUserTable } = require("./models/auth-model");

// parse the body
app.use(express.json());

createUserTable()
  .then(() => console.log("User table has been created"))
  .catch((error) => console.log(error));

app.use("/api/auth", require("./routes/auth-route"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
