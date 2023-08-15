import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./api/connectDB.js";
dotenv.config();

connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//app.use("/api/users", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  console.log("DIRNAME: ", __dirname, path);
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("hello from the server!");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8080, () => {
  console.log("connected to port " + process.env.PORT);
});
