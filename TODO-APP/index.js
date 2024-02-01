import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import taskRoute from "./routes/task.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
}).then(
  (res) => {
    console.log("Connected To DataBase");
  }
).catch((err) => {
  console.log(err);
});

const port = process.env.PORT || 8080;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
