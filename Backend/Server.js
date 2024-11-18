const express = require("express");
const cors = require("cors");
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
