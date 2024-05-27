const express = require("express");
const blogRoutes = require("./Routes/blog.router.js");
const cors = require("cors");
const bodyParser = require("body-parser");

// create the express application
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/v1/posts", blogRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
