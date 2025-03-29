const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const TaskRoute = require("./routes/TaskRoute");
const UserRoute = require("./routes/UserRoute");
const CollectionRoute = require("./routes/collectionRoutes");
require("dotenv").config();

connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/tasks", TaskRoute);
app.use("/api/users", UserRoute);
app.use("/api/collections", CollectionRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
