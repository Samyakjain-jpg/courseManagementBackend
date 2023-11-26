import express from "express"
import {config} from "dotenv"
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//Port number define
config({
    path:"./config/config.env",
});

const app = express()

//using middleware
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));

//importing & using Routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";

//use cookie Parser
app.use(cookieParser());

//is server se dusri website pr req nii kr payege
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

//for check is server working in the another environment like crome or etc.
app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

export default app;

app.use(ErrorMiddleware);