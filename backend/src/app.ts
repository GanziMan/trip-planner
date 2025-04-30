import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Worl2d!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send("Internal Server Error");
});
// 경로 지정가능 app.use('/경로',express.static("uploads"));
app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 대기중");
});
