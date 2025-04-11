const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const TaskRoute = require("./routes/TaskRoute");
const UserRoute = require("./routes/UserRoute");
const CollectionRoute = require("./routes/collectionRoutes");
require("dotenv").config();

connectDB();
app.use(helmet());
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/tasks", TaskRoute);
app.use("/api/users", UserRoute);
app.use("/api/collections", CollectionRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
