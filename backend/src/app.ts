import express from "express";

import cors from "cors";
const app = express();
import userRouter from "./routes/user";

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 대기중");
});
