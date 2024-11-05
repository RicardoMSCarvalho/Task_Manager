import express from "express";
import DBCon from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/TaskRoute.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
DBCon();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // URL do FEnd
    credentials: true, // Permitir credenciais
  })
);
app.use(express.json());

app.use("/task", taskRoutes);

app.listen(PORT, () => {
  console.log("The server is listening");
});
