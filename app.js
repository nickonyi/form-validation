import express from "express";
import url from "url";
import path from "path";
import usersRouter from "./routes/usersRouter.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
