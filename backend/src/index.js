import dotenv from "dotenv";
import { connectDB} from "./db/index.js";
import { app } from "./app.js";
import UserRouter from "./routes/user.routes.js"
import DocumentRouter from "./routes/document.routes.js"

dotenv.config({
  path: "./env",
});

const PORT = process.env.PORT || 5000;

app.use('/api/v1/user', UserRouter)
app.use('/api/v1/document', DocumentRouter)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`);
  })
}).catch((err) => {
    console.log("MongoDB connection failed", err);
})
