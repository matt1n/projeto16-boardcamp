import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouters from "./routes/categoriesRoutes.js"
import gamesRouters from "./routes/gamesRoutes.js"
import customersRouters from "./routes/customersRoutes.js"
import rentalsRouters from "./routes/rentalsRoutes.js"

const app = express();
app.use(express.json())
app.use(cors());
app.use(categoriesRouters)
app.use(gamesRouters)
app.use(customersRouters)
app.use(rentalsRouters)

const port = process.env.PORT || 4000

app.listen(port,()=> console.log(`Server running in port: ${port}`))
