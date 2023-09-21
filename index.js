const express = require('express')
const userRoute = require("./routes/users");
const blogRoute = require("./routes/blogs")
const app = express();
const cors = require("cors");
const {connection } = require("./connection");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/users",userRoute)
app.use("/blogs",blogRoute)

app.listen(PORT, async (req, res) => {
    const { db } = await connection();
  
    const coll = await db.listCollections().toArray();
    if (coll.length) {
      console.log(`App running on Port - ${PORT}`);
    }
  });
